import mongoose, { Schema } from 'mongoose';
import {} from './schemas.js';
const RegionSchema = new Schema({
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
}, {
    timestamps: true
});
RegionSchema.virtual('provinces', {
    ref: 'Province',
    localField: '_id',
    foreignField: 'regionId',
});
RegionSchema.set('toJSON', { virtuals: true });
const Region = mongoose.model('Region', RegionSchema);
export default Region;
//# sourceMappingURL=region.model.js.map