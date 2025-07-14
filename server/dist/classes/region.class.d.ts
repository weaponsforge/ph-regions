import MongoCrudClass from "./mongo.class.js";
import { ZodObject, type HydratedDocument, Model } from "@/types/types.js";
declare class RegionClass<T, Z extends ZodObject<any>> extends MongoCrudClass<T, Z> {
    constructor(model: Model<T>, schema: Z);
    listAll(): Promise<HydratedDocument<T>[]>;
    delete(id: string): Promise<void>;
}
export default RegionClass;
