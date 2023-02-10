export const CatchAsync = (
  target: object,
  _propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args: any) {
    try {
      return await originalMethod.apply(target, args);
    } catch (error) {
      throw new Error(`Special error message: ${error.message}`);
    }
  };
  return descriptor;
};
