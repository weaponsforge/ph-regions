import mongoose, { Schema } from 'mongoose'
import Province from './province.model.js'
import { ProvinceDataSchema, type TRegionData } from './schemas.js';
/*
export interface IRegion extends Document {
  id?: string;
  regionId: number;
  name: string;
  provinces?: IProvince[];
}
*/
const RegionSchema = new Schema<TRegionData>({
  regionId: {
    type: String
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
  localField: '_id',
  foreignField: 'regionId'
})

const Region = mongoose.model<TRegionData>('Region', RegionSchema)

// Ensure the index is created
// Region.createIndexes().catch(console.error)

RegionSchema.pre('save', funcion (next) {
  try {
    const result = ProvinceDataSchema.safeParse(this.toObject())

    if (!result.success) {
      const errors = result.error.errors.map((err: Record<string, any>) =>
        `${err.path.join('.'): ${err.message}}`
      ).join(', ')
    }

    next()
  } catch (err) {
    next(err as Error)
  }
})

export default Region
