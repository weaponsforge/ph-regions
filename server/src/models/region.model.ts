import mongoose, { Document, Schema } from 'mongoose'
import Province, { type IProvince } from './province.model.js'

export interface IRegion extends Document {
  id?: string;
  regionId: number;
  name: string;
  provinces?: IProvince[];
}

const RegionSchema = new Schema<IRegion>({
  regionId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

// Create a unique index on regionId
RegionSchema.index({ regionId: 1 }, { unique: true })

RegionSchema.virtual('provinces', {
  ref: Province.modelName,
  localField: 'regionId',
  foreignField: 'regionId'
})

const Region = mongoose.model<IRegion>('Region', RegionSchema)

// Ensure the index is created
Region.createIndexes().catch(console.error)
export default Region
