const Service = require("../services/UserService");

/* Redis Services */
const redisClient = require("../services/Redisservices.js");
const appconfig = require('../config/appconfig.js');

module.exports = class UserController{
   static async apiGetAll(req, res, next){
      try {
         let records = [];

         redisClient.get('users', async function (err, res) {
            if (err) {
               records = [];
            } else if (res) {
               const rawResults = JSON.parse(res);

               if (rawResults.length === 0) {
                  results = await Service.getAll();

                  redisClient.set('users', JSON.stringify(results));
                  redisClient.expire('users', 7200);
               } else {
                  records = rawResults;
               }
            } else {
               records = await Service.getAll();
      
               redisClient.set('users', JSON.stringify(records));
               redisClient.expire('users', 7200);
            }
         });

         // race condition for async
         let promiseAll = new Promise(() => {
            let wait = setTimeout(() => {
               clearTimeout(wait);

               if (records.length > 0) {
                  res.json(records);
               } else {
                  res.status(404).json("There are no records published yet!");
               }
            }, appconfig.connecttimeout);
         });
      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiGetById(req, res, next){
      try {
         let id = req.params.id || {};
         const record = await Service.getbyId(id);
         res.json(record);
      } catch (error) {
         res.status(500).json({error: error})
      }
   }

   static async apiGetByAccountNumber(req, res, next){
      try {
         let records = [];
         let id = req.params.id || {};

         redisClient.get('accountNumber:' + id, async function (err, res) {
            if (err) {
               records = [];
            } else if (res) {
                const rawResults = JSON.parse(res);
    
                if (rawResults.length === 0) {
                     records = await Service.getbyAccountNumber(id);
    
                     redisClient.set('accountNumber:' + id, JSON.stringify(records));
                     redisClient.expire('accountNumber:' + id, 7200);
                } else {
                  records = rawResults;
                }
            } else {
               records = await Service.getbyAccountNumber(id);
    
               redisClient.set('accountNumber:' + id, JSON.stringify(records));
               redisClient.expire('accountNumber:' + id, 7200);
            }
         });

         // race condition for async
         let promiseAll = new Promise(() => {
            let wait = setTimeout(() => {
               clearTimeout(wait);

               if (records.length > 0) {
                  res.json(records);
               } else {
                  res.status(404).json("There are no records published yet!");
               }
            }, appconfig.connecttimeout);
         });
      } catch (error) {
         res.status(500).json({error: error})
      }
   }

   static async apiGetByIdentityNumber(req, res, next){
      try {
         let records = [];
         let id = req.params.id || {};

         redisClient.get('identityNumber:' + id, async function (err, res) {
            if (err) {
               records = [];
            } else if (res) {
                const rawResults = JSON.parse(res);
    
                if (rawResults.length === 0) {
                  records = await Service.getbyIdentityNumber(id);
    
                  redisClient.set('identityNumber:' + id, JSON.stringify(results));
                  redisClient.expire('identityNumber:' + id, 7200);
                } else {
                  records = rawResults;
                }
            } else {
               records = await Service.getbyIdentityNumber(id);
    
               redisClient.set('identityNumber:' + id, JSON.stringify(results));
               redisClient.expire('identityNumber:' + id, 7200);
            }
         });

         // race condition for async
         let promiseAll = new Promise(() => {
            let wait = setTimeout(() => {
               clearTimeout(wait);

               if (records.length > 0) {
                  res.json(records);
               } else {
                  res.status(404).json("There are no records published yet!");
               }
            }, appconfig.connecttimeout);
         });
      } catch (error) {
         res.status(500).json({error: error})
      }
   }

   static async apiCreate(req, res, next){
      try {
         redisClient.del('users');
         const record =  await Service.create(req.body);
         res.json(record);
      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiUpdate(req, res, next){
      try {
         redisClient.del('users');

         let id = req.params.id;

         const record = {}
         record.userName = req.body.userName;
         record.accountNumber = req.body.accountNumber;
         record.emailAddress = req.body.emailAddress;
         record.identityNumber = req.body.identityNumber;

         const updatedRecord = await Service.update(id, record);

         if(updatedRecord.modifiedCount === 0){
            throw new Error("Unable to update user, error occord");
         }

         res.json(updatedRecord);

      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiDelete(req, res, next){
      try {
         redisClient.del('users');
         
         const id = req.params.id;
         const deleteRecord =  await Service.delete(id)
         res.json(deleteRecord);
      } catch (error) {
         res.status(500).json({error: error})
      }
   }
}