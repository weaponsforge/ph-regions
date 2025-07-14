import RegionClass from "./region.class.js";
declare const RegionInstance: RegionClass<{
    name: string;
    abbrev: string | null;
    regionalCode: string | null;
    _id?: string | undefined;
    __v?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    regionalName?: string | undefined;
    provinces?: {
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
    }[] | undefined;
}, import("zod").ZodObject<any, import("zod/v4/core").$strip>>;
export default RegionInstance;
