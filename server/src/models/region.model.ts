import mongoose, { Schema, SchemaTypes } from 'mongoose'
import Province from './province.model.js'
import { type TRegionData } from './schemas.js';

const RegionSchema = new Schema<TRegionData>({
  name: {
    type: String,
    required: true
  },
  abbrev: {
    type: String,
    default: null,
  },
  regionalName: {
    type: String
  },
  regionalCode: {
    type: String
  }
},
{
  timestamps: true
})

RegionSchema.virtual('provinces', {
  ref: 'Province',           // The model to use
  localField: '_id',         // Find provinces where `regionId` matches this region's `_id`
  foreignField: 'regionId',  // The field in Province
});

RegionSchema.set('toJSON', { virtuals: true });

const Region = mongoose.model<TRegionData>('Region', RegionSchema)

// Ensure the index is created
// Region.createIndexes().catch(console.error)
export default Region
