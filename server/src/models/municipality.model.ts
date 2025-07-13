import mongoose, { Schema, SchemaTypes } from 'mongoose'
import { type TMunicipality } from './schemas.js';
/*
export interface IMunicipality extends Document {
  id?: string;
  regionId: number;
  provinceId: number;
  municipalityId: number;
  name: string;
  numDocs: number;
}
*/
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
  },
},
{
  timestamps: true
})

const Municipality = mongoose.model<TMunicipality>('Municipality', MunicipalitySchema)
export default Municipality
