const users = require('../models/users');

register = async (req, res) => {
    
    try {
        let {name, email} = req.body;
        name = name.trim(), email = email.trim();
        
        let user = await users.findOne({"email":email}).exec();
        
        if(user) {
            return res.sendError(`User already registered`);
        }
        
        const newUser = new users({
            name,
            email
        });
        
        let result = await newUser.save();
        
        return (result) ? res.sendResponse(result) : res.sendError({msg: `User couldn't be registered`});
        
    } catch(err) {
        return res.sendError(`User couldn't be registered`, err);
    }
}

login = async(req, res) => {
    
    try {

        let {email} = req.body;
        email = email.trim();

        let user = await users.findOne({"email": email}).exec();

        if(!user){
            return res.sendError(`User not registered`);
        }

        req.session.user_id = user._id;
        req.session.name = user.name;
        req.session.email = user.email;
        req.session.save();

        return res.sendResponse({
            user
        }); 

    } catch(err) {

        return res.sendError(`Login unsuccessful`, err);
    }    
}

logout = async (req, res) => {
    try {
        req.session.destroy((err) => err ? res.sendError(`Logout failed`) : res.sendResponse(`Logged out`) );
    } catch (err) {
        return res.sendError(err, `Logout failed`);
    }
}

module.exports = {
    register,
    login,
    logout
}