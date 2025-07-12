import mongoose, { Schema } from 'mongoose'
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
    type: String,
    required: true
  },
  provinceId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
},
{
  timestamps: true
})

// Create a unique index on provinceId
ProvinceSchema.index({ provinceId: 1 }, { unique: true })

ProvinceSchema.virtual('municipalities', {
  ref: Municipality.modelName,
  localField: 'provinceId',
  foreignField: 'provinceId'
})

const Province = mongoose.model<TProvinceData>('Province', ProvinceSchema)
export default Province
