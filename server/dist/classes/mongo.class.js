import { ZodObject } from '@/types/types.js';
import { Model } from '@/types/types.js';
import MongoCRUD from './mongo.abstract.js';
/**
 * @class MongoCrudClass
 * @description This is a class that implements the MongoCRUD blueprint for interfacing with MongoDB
 */
class MongoCrudClass extends MongoCRUD {
    constructor(model, schema) {
        super(model, schema);
    }
    async create(params) {
        this.safeParse(params);
        return await this.model.create(params);
    }
    async update(id, params) {
        this.safeParse(params);
        return await this.model.findOneAndUpdate({ _id: id }, params, { returnOriginal: false });
    }
    async delete(id) {
        this.checkInternals();
        return await this.model.findByIdAndDelete(id);
    }
    async list(verbose = true) {
        this.checkInternals();
        if (verbose) {
            return await this.model.find({});
        }
        return await this.model
            .find({})
            .select({ __v: 0, createdAt: 0, updatedAt: 0 });
    }
    async get(id) {
        this.checkInternals();
        return await this.model.findById(id);
    }
}
export default MongoCrudClass;
//# sourceMappingURL=mongo.class.js.map