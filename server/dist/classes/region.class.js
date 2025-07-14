import mongoose from 'mongoose';
import MongoCrudClass from "./mongo.class.js";
import { ZodObject, Model } from "@/types/types.js";
import Municipality from "@/models/municipality.model.js";
import Province from "@/models/province.model.js";
class RegionClass extends MongoCrudClass {
    constructor(model, schema) {
        super(model, schema);
    }
    async listAll() {
        this.checkInternals();
        return await this.model.find({})
            .select({ __v: 0, createdAt: 0, updatedAt: 0 })
            .populate('provinces');
    }
    async delete(id) {
        const session = await mongoose.startSession();
        try {
            await session.withTransaction(async () => {
                await this.model.findByIdAndDelete(id).session(session);
                await Promise.all([
                    Province.deleteMany({ regionId: id }).session(session),
                    Municipality.deleteMany({ regionId: id }).session(session)
                ]);
            });
        }
        catch (err) {
            throw err;
        }
        finally {
            await session.endSession();
        }
    }
}
export default RegionClass;
//# sourceMappingURL=region.class.js.map