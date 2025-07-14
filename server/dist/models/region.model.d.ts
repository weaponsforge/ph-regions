import mongoose from 'mongoose';
declare const RegionSchema: mongoose.Schema<{
    name: string;
    abbrev: string | null;
    regionalCode: string | null;
    _id?: string | undefined;
    __v?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    regionalName?: string | undefined;
    provinces?: {
        regionId: string | mongoose.Types.ObjectId;
        name: string;
        _id?: string | undefined;
        __v?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        municipalities?: {
            regionId: string | mongoose.Types.ObjectId;
            provinceId: string | mongoose.Types.ObjectId;
            name: string;
            numDocs: number;
            _id?: string | undefined;
            __v?: number | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] | undefined;
    }[] | undefined;
}, mongoose.Model<{
    name: string;
    abbrev: string | null;
    regionalCode: string | null;
    _id?: string | undefined;
    __v?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    regionalName?: string | undefined;
    provinces?: {
        regionId: string | mongoose.Types.ObjectId;
        name: string;
        _id?: string | undefined;
        __v?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        municipalities?: {
            regionId: string | mongoose.Types.ObjectId;
            provinceId: string | mongoose.Types.ObjectId;
            name: string;
            numDocs: number;
            _id?: string | undefined;
            __v?: number | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] | undefined;
    }[] | undefined;
}, any, any, any, mongoose.Document<unknown, any, {
    name: string;
    abbrev: string | null;
    regionalCode: string | null;
    _id?: string | undefined;
    __v?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    regionalName?: string | undefined;
    provinces?: {
        regionId: string | mongoose.Types.ObjectId;
        name: string;
        _id?: string | undefined;
        __v?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        municipalities?: {
            regionId: string | mongoose.Types.ObjectId;
            provinceId: string | mongoose.Types.ObjectId;
            name: string;
            numDocs: number;
            _id?: string | undefined;
            __v?: number | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] | undefined;
    }[] | undefined;
}, any> & {
    name: string;
    abbrev: string | null;
    regionalCode: string | null;
    _id?: string | undefined;
    __v?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    regionalName?: string | undefined;
    provinces?: {
        regionId: string | mongoose.Types.ObjectId;
        name: string;
        _id?: string | undefined;
        __v?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        municipalities?: {
            regionId: string | mongoose.Types.ObjectId;
            provinceId: string | mongoose.Types.ObjectId;
            name: string;
            numDocs: number;
            _id?: string | undefined;
            __v?: number | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] | undefined;
    }[] | undefined;
} & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    abbrev: string | null;
    regionalCode: string | null;
    _id?: string | undefined;
    __v?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    regionalName?: string | undefined;
    provinces?: {
        regionId: string | mongoose.Types.ObjectId;
        name: string;
        _id?: string | undefined;
        __v?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        municipalities?: {
            regionId: string | mongoose.Types.ObjectId;
            provinceId: string | mongoose.Types.ObjectId;
            name: string;
            numDocs: number;
            _id?: string | undefined;
            __v?: number | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] | undefined;
    }[] | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    abbrev: string | null;
    regionalCode: string | null;
    _id?: string | undefined;
    __v?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    regionalName?: string | undefined;
    provinces?: {
        regionId: string | mongoose.Types.ObjectId;
        name: string;
        _id?: string | undefined;
        __v?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        municipalities?: {
            regionId: string | mongoose.Types.ObjectId;
            provinceId: string | mongoose.Types.ObjectId;
            name: string;
            numDocs: number;
            _id?: string | undefined;
            __v?: number | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] | undefined;
    }[] | undefined;
}>, {}> & mongoose.FlatRecord<{
    name: string;
    abbrev: string | null;
    regionalCode: string | null;
    _id?: string | undefined;
    __v?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    regionalName?: string | undefined;
    provinces?: {
        regionId: string | mongoose.Types.ObjectId;
        name: string;
        _id?: string | undefined;
        __v?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        municipalities?: {
            regionId: string | mongoose.Types.ObjectId;
            provinceId: string | mongoose.Types.ObjectId;
            name: string;
            numDocs: number;
            _id?: string | undefined;
            __v?: number | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] | undefined;
    }[] | undefined;
}> & Required<{
    _id: string;
}>>;
declare const Region: mongoose.Model<{
    name: string;
    abbrev: string | null;
    regionalCode: string | null;
    _id?: string | undefined;
    __v?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    regionalName?: string | undefined;
    provinces?: {
        regionId: string | mongoose.Types.ObjectId;
        name: string;
        _id?: string | undefined;
        __v?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        municipalities?: {
            regionId: string | mongoose.Types.ObjectId;
            provinceId: string | mongoose.Types.ObjectId;
            name: string;
            numDocs: number;
            _id?: string | undefined;
            __v?: number | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] | undefined;
    }[] | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    abbrev: string | null;
    regionalCode: string | null;
    _id?: string | undefined;
    __v?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    regionalName?: string | undefined;
    provinces?: {
        regionId: string | mongoose.Types.ObjectId;
        name: string;
        _id?: string | undefined;
        __v?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        municipalities?: {
            regionId: string | mongoose.Types.ObjectId;
            provinceId: string | mongoose.Types.ObjectId;
            name: string;
            numDocs: number;
            _id?: string | undefined;
            __v?: number | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] | undefined;
    }[] | undefined;
}, {}> & {
    name: string;
    abbrev: string | null;
    regionalCode: string | null;
    _id?: string | undefined;
    __v?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
    regionalName?: string | undefined;
    provinces?: {
        regionId: string | mongoose.Types.ObjectId;
        name: string;
        _id?: string | undefined;
        __v?: number | undefined;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
        municipalities?: {
            regionId: string | mongoose.Types.ObjectId;
            provinceId: string | mongoose.Types.ObjectId;
            name: string;
            numDocs: number;
            _id?: string | undefined;
            __v?: number | undefined;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        }[] | undefined;
    }[] | undefined;
} & Required<{
    _id: string;
}>, any>;
export type TRegionSchema = typeof RegionSchema;
export default Region;
