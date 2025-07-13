import mongoose, { Schema, SchemaTypes } from 'mongoose'
import Municipality from './municipality.model.js'
import { type TProvinceData } from './schemas.js';
/*
export interface IProvince extends Document {
  id?: string;
  regionId: number;
  provinceId: number;
  name: string;
  municipalities?: IMunicipality[];
}
*/
export const ProvinceSchema = new Schema<TProvinceData>({
  regionId: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'Region'
  },
  name: {
    type: String,
    required: true
  },
},
{
  timestamps: true
})

ProvinceSchema.virtual('municipalities', {
  ref: Municipality.modelName,
  localField: '_id',
  foreignField: 'provinceId'
})

const Province = mongoose.model<TProvinceData>('Province', ProvinceSchema)
export default Province
