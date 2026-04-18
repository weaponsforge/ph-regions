import mongoose, { Schema, SchemaTypes } from 'mongoose'
import Municipality from './municipality.model.js'
import type { TProvinceData } from '@/schemas/province.schema.js'

export const ProvinceSchema = new Schema<TProvinceData>({
  regionId: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'Region',
  },
  name: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
})

ProvinceSchema.virtual('municipalities', {
  ref: Municipality.modelName,
  localField: '_id',
  foreignField: 'provinceId',
})
/*
ProvinceSchema.virtual('provinceId').get(function() {
  return this._id
})
*/
ProvinceSchema.set('toJSON', { virtuals: true })

const Province = mongoose.model<TProvinceData>('Province', ProvinceSchema)
export default Province
