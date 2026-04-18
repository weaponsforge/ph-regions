import mongoose, { Schema, SchemaTypes } from 'mongoose'
import type { TRegionData } from '@/schemas/region.schema.js'

const RegionSchema = new Schema<TRegionData>({
  islandId: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'Island',
  },
  name: {
    type: String,
    required: true,
  },
  abbrev: {
    type: String,
    default: null,
  },
  regionalName: {
    type: String,
  },
  regionalCode: {
    type: String,
  },
},
{
  timestamps: true,
})

RegionSchema.virtual('provinces', {
  ref: 'Province',
  localField: '_id',
  foreignField: 'regionId',
})

RegionSchema.set('toJSON', { virtuals: true })

const Region = mongoose.model<TRegionData>('Region', RegionSchema)

export type TRegionModel = typeof Region
export default Region
