const ObjectID = require('mongodb').ObjectID;
const users = require('../models/users');

listAllRecords = async(req, res) => {
    
    try {
        
        let records = await users.findOne({"email": req.session.email}, {"records" : 1});
        return res.sendResponse(records);
        
    } catch(e) {
        return res.sendError(`Couldn't fetch records`, e);
    }
}

addRecord = async(req, res) => {
    
    try {
        
        let {cost, category, title, details} = req.body;
        cost = Number(cost);
        let current = new Date();
        let time = current.toLocaleTimeString();
        let dd = String(current.getDate()).padStart(2, '0');
        let mm = String(current.getMonth() + 1).padStart(2, '0');
        let yyyy = String(current.getFullYear())
        let date = `${dd}/${mm}/${yyyy}`;
        const record_id = new ObjectID();
        
        const newRecord = {
            record_id,
            cost,
            title,
            category,
            details,
            date,
            time
        };
        
        const user_id = req.session.user_id;
        const result = await users.findByIdAndUpdate(
            user_id, 
            { $push : { records : { $each: [newRecord],$position: 0 }}}, 
            {new: true, useFindAndModify: false}
        );
        
        return res.sendResponse(result);
        
    } catch(e) {
        return res.sendError(`Couldn't add record`, e);
    }
}


deleteRecord =  async(req, res) => {
    
    try {

        let {record_id} = req.body;
        const user_id = new ObjectID(req.session.user_id);
        record_id = new ObjectID(record_id);

        let result = await users.findByIdAndUpdate(
            user_id, 
            { $pull : { records : {record_id: record_id}}},
            { new: true, useFindAndModify: false }
        );

        return res.sendResponse(result); 
    
    } catch(e) {
        return res.sendError(`Couldn't delete record`, e);
    } 
}

module.exports = {
    listAllRecords,
    addRecord,
    deleteRecord
}