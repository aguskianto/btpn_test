const Model = require("../models/user");

module.exports = class UserService{
    static async getAll(){
        try {
            const records = await Model.find();
            return records;
        } catch (error) {
            console.log(`Could not fetch users ${error}`)
        }
    }

    static async create(data){
        try {
            const record = {
                userName: data.userName,
                accountNumber: data.accountNumber,
                emailAddress: data.emailAddress,
                identityNumber: data.identityNumber
            }

            const response = await new Model(record).save();
            return response;
        } catch (error) {
            console.log(error);
        } 
    }

    static async getbyId(Id){
        try {
            const record =  await Model.findById({_id: Id});
            return record;
        } catch (error) {
            console.log(`User not found. ${error}`)
        }
    }

    static async getbyAccountNumber(Id){
        try {
            const record =  await Model.find({accountNumber: Id});
            return record;
        } catch (error) {
            console.log(`User not found. ${error}`)
        }
    }

    static async getbyIdentityNumber(Id){
        try {
            const record =  await Model.find({identityNumber: Id});
            return record;
        } catch (error) {
            console.log(`User not found. ${error}`)
        }
    }

    static async update(Id, record){
        try {
            const updateRecord =  await Model.findByIdAndUpdate(Id, record, {new: true});

            return updateRecord;
        } catch (error) {
            console.log(`Could not update user ${error}` );
        }
    }

    static async delete(Id){
        try {
            const deletedRecord = await Model.findOneAndRemove(Id);
            return deletedRecord;
        } catch (error) {
            console.log(`Could  ot delete user ${error}`);
        }
    }
}