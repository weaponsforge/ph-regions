import mongoose, { Schema, SchemaTypes } from 'mongoose'
import { type TStatsData } from './schemas.js'

const StatsSchema = new Schema<TStatsData>({
  municipalityId: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'Municipality'
  },
  numBrgy: {
    type: Number,
    required: true
  }
},
{
  timestamps: true
})

const Stats = mongoose.model<TStatsData>('Stats', StatsSchema)

export type TStatsModel = typeof Stats
export default Stats
