import mongoose from 'mongoose';
export declare const ProvinceSchema: mongoose.Schema<{
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
}, mongoose.Model<{
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
}, any, any, any, mongoose.Document<unknown, any, {
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
}, any> & {
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
} & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
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
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
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
}>, {}> & mongoose.FlatRecord<{
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
}> & Required<{
    _id: string;
}>>;
declare const Province: mongoose.Model<{
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
}, {}, {}, {}, mongoose.Document<unknown, {}, {
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
}, {}> & {
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
} & Required<{
    _id: string;
}>, any>;
export default Province;
