import mongoose, { Schema, SchemaTypes } from 'mongoose'
import type { TMunicipality } from '@/schemas/municipality.schema.js'

const MunicipalitySchema = new Schema<TMunicipality>({
  regionId: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'Region'
  },
  provinceId: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'Province'
  },
  name: {
    type: String,
    required: true
  },
  numDocs: {
    type: Number,
    required: true,
    default: 0
  }
},
{
  timestamps: true
})

MunicipalitySchema.set('toJSON', { virtuals: true })

const Municipality = mongoose.model<TMunicipality>('Municipality', MunicipalitySchema)
export default Municipality
