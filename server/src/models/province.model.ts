import mongoose, { Document, Schema } from 'mongoose'
import Municipality, { type IMunicipality } from './municipality.model.js'

export interface IProvince extends Document {
  id?: string;
  regionId: number;
  provinceId: number;
  name: string;
  municipalities?: IMunicipality[];
}

const ProvinceSchema = new Schema<IProvince>({
  regionId: {
    type: Number,
    required: true
  },
  provinceId: {
    type: Number,
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

ProvinceSchema.virtual('municipalities', {
  ref: Municipality.modelName,
  localField: 'provinceId',
  foreignField: 'provinceId'
})

const Province = mongoose.model<IProvince>('Province', ProvinceSchema)
export default Province
