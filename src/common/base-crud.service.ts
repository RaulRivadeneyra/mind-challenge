import { EntityRepository } from '../database/entity.repository';
import { AnyObject, HydratedDocument } from 'mongoose';

export class BaseCRUDService<Entity, CreateDTO, UpdateDTO> {
  constructor(
    protected readonly repository: EntityRepository<HydratedDocument<Entity>>,
  ) {}
  async create(entity: CreateDTO): Promise<Entity> {
    return this.repository.create(entity);
  }
  async findOne(id: string): Promise<Entity | null> {
    return this.repository.findOne({ _id: id });
  }
  async findAll(): Promise<Entity[] | null> {
    return this.repository.find({});
  }
  async update(id: string, entity: UpdateDTO): Promise<Entity | null> {
    return this.repository.findOneAndUpdate({ _id: id }, entity as AnyObject);
  }
  async deleteOne(id: string): Promise<boolean> {
    return this.repository.deleteOne({ _id: id });
  }

  async deleteMany(ids: string[]): Promise<boolean> {
    return this.repository.deleteMany({ _id: { $in: ids } });
  }
}
