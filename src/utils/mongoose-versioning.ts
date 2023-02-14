// Ignore ts and eslint errors for this file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// @typescript-eslint/no-unused-vars
/* eslint-disable*/

import JsonDiffPatch from 'jsondiffpatch';
import {
  AnyObject,
  HydratedDocument,
  InferSchemaType,
  Mongoose,
  SchemaTypes,
} from 'mongoose';
import semver from 'semver';

interface PluginOptions {
  mongoose?: Mongoose; // A mongoose instance
  modelName: string; // Name of the collection for the histories
  embeddedDocument: boolean; // Is this a sub document
  embeddedModelName: string; // Name of model if used with embedded document
  userCollection: string; // Collection to ref when you pass an user id
  userCollectionIdType: false; // Type for user collection ref id, defaults to ObjectId
  accountCollection: string; // Collection to ref when you pass an account id or the item has an account property
  accountCollectionIdType: boolean; // Type for account collection ref id, defaults to ObjectId
  userFieldName: string; // Name of the property for the user
  accountFieldName: string; // Name of the property of the account if any
  timestampFieldName: string; // Name of the property of the timestamp
  methodFieldName: string; // Name of the property of the method
  collectionIdType: boolean; // Cast type for _id (support for other binary types like uuid)
  ignore: []; // List of fields to ignore when compare changes
  noDiffSave: boolean; // Save event even if there are no changes
  noDiffSaveOnMethods: []; // Save event even if there are no changes if method matches
  noEventSave: boolean; // If false save only when __history property is passed
  startingVersion: string; // Default starting version

  // If true save only the _id of the populated fields
  // If false save the whole object of the populated fields
  // If false and a populated field property changes it triggers a new history
  // You need to populate the field after a change is made on the original document or it will not catch the differences
  ignorePopulatedFields: boolean;
}

const historyPlugin = (options: PluginOptions) => {
  const defaultOptions: PluginOptions = {
    modelName: '__histories', // Name of the collection for the histories
    embeddedDocument: false, // Is this a sub document
    embeddedModelName: '', // Name of model if used with embedded document
    userCollection: 'users', // Collection to ref when you pass an user id
    userCollectionIdType: false, // Type for user collection ref id, defaults to ObjectId
    accountCollection: 'accounts', // Collection to ref when you pass an account id or the item has an account property
    accountCollectionIdType: false, // Type for account collection ref id, defaults to ObjectId
    userFieldName: 'user', // Name of the property for the user
    accountFieldName: 'account', // Name of the property of the account if any
    timestampFieldName: 'timestamp', // Name of the property of the timestamp
    methodFieldName: 'method', // Name of the property of the method
    collectionIdType: false, // Cast type for _id (support for other binary types like uuid)
    ignore: [], // List of fields to ignore when compare changes
    noDiffSave: false, // Save event even if there are no changes
    noDiffSaveOnMethods: [], // Save event even if there are no changes if method matches
    noEventSave: true, // If false save only when __history property is passed
    startingVersion: '0.0.0', // Default starting version

    // If true save only the _id of the populated fields
    // If false save the whole object of the populated fields
    // If false and a populated field property changes it triggers a new history
    // You need to populate the field after a change is made on the original document or it will not catch the differences
    ignorePopulatedFields: true,
  };
  Object.assign(defaultOptions, options);

  if (defaultOptions.mongoose === undefined) {
    throw new Error('You need to pass a mongoose instance');
  }

  const mongoose = defaultOptions.mongoose;

  const collectionIdType = options.collectionIdType || SchemaTypes.ObjectId;
  const userCollectionIdType =
    options.userCollectionIdType || SchemaTypes.ObjectId;
  const accountCollectionIdType =
    options.accountCollectionIdType || SchemaTypes.ObjectId;

  const Schema = new mongoose.Schema(
    {
      collectionName: String,
      documentId: { type: collectionIdType },
      diff: {},
      event: String,
      reason: String,
      data: { type: SchemaTypes.Mixed },
      [defaultOptions.userFieldName]: {
        type: userCollectionIdType,
        ref: defaultOptions.userCollection,
      },
      [defaultOptions.accountFieldName]: {
        type: accountCollectionIdType,
        ref: defaultOptions.accountCollection,
      },
      version: { type: String, default: defaultOptions.startingVersion },
      start: Date,
      end: Date,
      [defaultOptions.timestampFieldName]: Date,
      [defaultOptions.methodFieldName]: String,
    },
    {
      collection: defaultOptions.modelName,
    },
  );

  Schema.set('minimize', false);
  Schema.set('versionKey', false);
  Schema.set('strict', false);

  const Model = mongoose.model(defaultOptions.modelName, Schema);

  const getModelName = (defaultName: string) => {
    return defaultOptions.embeddedDocument
      ? defaultOptions.embeddedModelName
      : defaultName;
  };

  const jdf = JsonDiffPatch.create({
    objectHash: function (obj: any, index: number) {
      if (obj !== undefined) {
        return (
          (obj._id && obj._id.toString()) ||
          obj.id ||
          obj.key ||
          '$$index:' + index
        );
      }

      return '$$index:' + index;
    },
    arrays: {
      detectMove: true,
    },
  });

  const query = (method: string, options: AnyObject) => {
    const query = Model[method](options.find || {});

    if (options.select !== undefined) {
      Object.assign(options.select, {
        _id: 0,
        documentId: 0,
        collectionName: 0,
      });

      query.select(options.select);
    }

    options.sort && query.sort(options.sort);
    options.populate && query.populate(options.populate);
    options.limit && query.limit(options.limit);

    return query;
  };

  const getPreviousVersion = async (
    document: HydratedDocument<typeof Schema>,
  ) => {
    // get the oldest version from the history collection
    const versions = await document.getVersions();
    return versions[versions.length - 1] ? versions[versions.length - 1] : {};
  };

  const getPopulatedFields = (document: HydratedDocument<typeof Schema>) => {
    const populatedFields = [];
    // we only depopulate the first depth of fields
    for (const field in document) {
      if (document.populated(field)) {
        populatedFields.push(field);
      }
    }

    return populatedFields;
  };

  const depopulate = (
    document: HydratedDocument<typeof Schema>,
    populatedFields: string[],
  ) => {
    // we only depopulate the first depth of fields
    for (const field of populatedFields) {
      document.depopulate(field);
    }
  };

  const repopulate = async (
    document: HydratedDocument<typeof Schema>,
    populatedFields: string[],
  ) => {
    for (const field of populatedFields) {
      await document.populate(field).execPopulate();
    }
  };

  let cloneObjectByJson = (object) =>
    object ? JSON.parse(JSON.stringify(object)) : {};

  let cleanFields = (object) => {
    delete object.__history;
    delete object.__v;

    for (let i in pluginOptions.ignore) {
      delete object[pluginOptions.ignore[i]];
    }
    return object;
  };

  let getDiff = ({ prev, current, document, forceSave }) => {
    let diff = jdf.diff(prev, current);

    let saveWithoutDiff = false;
    if (document.__history && pluginOptions.noDiffSaveOnMethods.length) {
      let method = document.__history[pluginOptions.methodFieldName];
      if (pluginOptions.noDiffSaveOnMethods.includes(method)) {
        saveWithoutDiff = true;
        if (forceSave) {
          diff = prev;
        }
      }
    }

    return {
      diff,
      saveWithoutDiff,
    };
  };

  let saveHistory = async ({ document, diff }, createdAt) => {
    let lastHistory = await Model.findOne({
      collectionName: getModelName(document.constructor.modelName),
      documentId: document._id,
    })
      .sort('-' + pluginOptions.timestampFieldName)
      .select({ version: 1 });

    let obj = {};
    obj.collectionName = getModelName(document.constructor.modelName);
    obj.documentId = document._id;
    obj.diff = diff || {};
    obj.start = createdAt;

    if (document.__history) {
      obj.event = document.__history.event;
      obj[pluginOptions.userFieldName] =
        document.__history[pluginOptions.userFieldName];
      obj[pluginOptions.accountFieldName] =
        document[pluginOptions.accountFieldName] ||
        document.__history[pluginOptions.accountFieldName];
      obj.reason = document.__history.reason;
      obj.data = document.__history.data;
      obj[pluginOptions.methodFieldName] =
        document.__history[pluginOptions.methodFieldName];
    }

    let version;

    if (lastHistory) {
      let type =
        document.__history && document.__history.type
          ? document.__history.type
          : 'major';

      version = semver.inc(lastHistory.version, type);
    }

    obj.version = version || pluginOptions.startingVersion;
    for (let i in obj) {
      if (obj[i] === undefined) {
        delete obj[i];
      }
    }

    let history = new Model(obj);

    document.__history = undefined;
    await history.save();
  };

  return function (schema) {
    schema.add({
      __history: { type: mongoose.Schema.Types.Mixed },
    });

    let preSave = function (forceSave) {
      return async function (next) {
        let currentDocument = this;
        const createdAt = new Date();
        if (
          currentDocument.__history !== undefined ||
          pluginOptions.noEventSave
        ) {
          try {
            let previousVersion = await getPreviousVersion(currentDocument);
            let populatedFields = getPopulatedFields(currentDocument);

            if (pluginOptions.ignorePopulatedFields) {
              depopulate(currentDocument, populatedFields);
            }

            let currentObject = cleanFields(cloneObjectByJson(currentDocument));
            let previousObject = cleanFields(
              cloneObjectByJson(previousVersion.object),
            );

            if (pluginOptions.ignorePopulatedFields) {
              await repopulate(currentDocument, populatedFields);
            }

            let { diff, saveWithoutDiff } = getDiff({
              current: currentObject,
              prev: previousObject,
              document: currentDocument,
              forceSave,
            });

            if (diff || pluginOptions.noDiffSave || saveWithoutDiff) {
              await saveHistory({ document: currentDocument, diff }, createdAt);
              if (Object.keys(previousVersion).length > 0) {
                previousVersion.set('end', createdAt);
                await previousVersion.save();
              }
            }

            return next();
          } catch (error) {
            return next(error);
          }
        }

        next();
      };
    };

    schema.pre('save', preSave(false));

    schema.pre('remove', preSave(true));

    // diff.find
    schema.methods.getDiffs = function (options = {}) {
      options.find = options.find || {};
      Object.assign(options.find, {
        collectionName: getModelName(this.constructor.modelName),
        documentId: this._id,
      });

      options.sort = options.sort || '-' + pluginOptions.timestampFieldName;

      return query('find', options);
    };

    // diff.get
    schema.methods.getDiff = function (version, options = {}) {
      options.find = options.find || {};
      Object.assign(options.find, {
        collectionName: getModelName(this.constructor.modelName),
        documentId: this._id,
        version: version,
      });

      options.sort = options.sort || '-' + pluginOptions.timestampFieldName;

      return query('findOne', options).lean();
    };

    // versions.get
    schema.methods.getVersion = async function (
      version2get,
      includeObject = true,
    ) {
      let histories = await this.getDiffs({
        sort: pluginOptions.timestampFieldName,
      }).lean();

      let lastVersion = histories[histories.length - 1],
        firstVersion = histories[0],
        history,
        version = {};

      if (semver.gt(version2get, lastVersion.version)) {
        version2get = lastVersion.version;
      }

      if (semver.lt(version2get, firstVersion.version)) {
        version2get = firstVersion.version;
      }

      histories.map((item) => {
        if (item.version === version2get) {
          history = item;
        }
      });

      if (!includeObject) {
        return history;
      }

      histories.map((item) => {
        if (
          semver.lt(item.version, version2get) ||
          item.version === version2get
        ) {
          version = jdf.patch(version, item.diff);
        }
      });

      delete history.diff;
      history.object = version;

      return history;
    };

    // versions.compare
    schema.methods.compareVersions = async function (
      versionLeft,
      versionRight,
    ) {
      let versionLeftDocument = await this.getVersion(versionLeft);
      let versionRightDocument = await this.getVersion(versionRight);

      return {
        diff: jdf.diff(versionLeftDocument.object, versionRightDocument.object),
        left: versionLeftDocument.object,
        right: versionRightDocument.object,
      };
    };

    // versions.find
    schema.methods.getVersions = async function (
      options = {},
      includeObject = true,
    ) {
      options.sort = options.sort || pluginOptions.timestampFieldName;

      let histories = await this.getDiffs(options);

      if (!includeObject) {
        return histories;
      }

      let version = {};
      for (let i = 0; i < histories.length; i++) {
        version = jdf.patch(version, histories[i].diff);
        histories[i].object = jdf.clone(version);
        delete histories[i].diff;
      }

      return histories;
    };
  };
};

export default historyPlugin;
