import MongoCrudClass from "./mongo.class.js";
declare const ProvinceClass: MongoCrudClass<{
    regionId: string | import("mongoose").Types.ObjectId;
    name: string;
    _id?: string | undefined;
    __v?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    municipalities?: {
        regionId: string | import("mongoose").Types.ObjectId;
        provinceId: string | import("mongoose").Types.ObjectId;
        name: string;
        numDocs: number;
        _id?: string | undefined;
        __v?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    }[] | undefined;
}, import("zod").ZodObject<any, import("zod/v4/core").$strip>>;
export default ProvinceClass;
