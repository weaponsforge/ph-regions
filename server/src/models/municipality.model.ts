import mongoose, { Document, Schema } from 'mongoose'

export interface IMunicipality extends Document {
  id?: string;
  regionId: number;
  provinceId: number;
  municipalityId: number;
  name: string;
  numDocs: number;
}

const MunicipalitySchema = new Schema<IMunicipality>({
  regionId: {
    type: Number,
    required: true
  },
  provinceId: {
    type: Number,
    required: true
  },
  municipalityId: {
    type: Number,
    required: true,
    unique: true
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

const Municipality = mongoose.model<IMunicipality>('Municipality', MunicipalitySchema)
export default Municipality
