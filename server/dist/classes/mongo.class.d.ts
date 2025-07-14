import { ZodObject } from '@/types/types.js';
import { type HydratedDocument, Model } from '@/types/types.js';
import MongoCRUD from './mongo.abstract.js';
/**
 * @class MongoCrudClass
 * @description This is a class that implements the MongoCRUD blueprint for interfacing with MongoDB
 */
declare class MongoCrudClass<T, Z extends ZodObject<any>> extends MongoCRUD<T, Z> {
    constructor(model: Model<T>, schema: Z);
    create(params: Partial<T>): Promise<HydratedDocument<T>>;
    update(id: string, params: Partial<T>): Promise<HydratedDocument<T> | null>;
    delete(id: string): Promise<void | null>;
    list(verbose?: boolean): Promise<HydratedDocument<T>[]>;
    get(id: string): Promise<HydratedDocument<T> | null>;
}
export default MongoCrudClass;
