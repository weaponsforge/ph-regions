import mongoose from 'mongoose';
declare const Municipality: mongoose.Model<{
    regionId: string | mongoose.Types.ObjectId;
    provinceId: string | mongoose.Types.ObjectId;
    name: string;
    numDocs: number;
    _id?: string | undefined;
    __v?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    regionId: string | mongoose.Types.ObjectId;
    provinceId: string | mongoose.Types.ObjectId;
    name: string;
    numDocs: number;
    _id?: string | undefined;
    __v?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}, {}> & {
    regionId: string | mongoose.Types.ObjectId;
    provinceId: string | mongoose.Types.ObjectId;
    name: string;
    numDocs: number;
    _id?: string | undefined;
    __v?: number | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
} & Required<{
    _id: string;
}>, any>;
export default Municipality;
