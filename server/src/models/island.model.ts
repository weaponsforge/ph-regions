import mongoose, { Schema } from 'mongoose'
import type { TIslandData } from '@/schemas/island.schema.js'

const IslandSchema = new Schema<TIslandData>({
  name: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
})

IslandSchema.set('toJSON', { virtuals: true })

IslandSchema.virtual('regions', {
  ref: 'Region',
  localField: '_id',
  foreignField: 'islandId',
})

const Island = mongoose.model<TIslandData>('Island', IslandSchema)
export default Island
