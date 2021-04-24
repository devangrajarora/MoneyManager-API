module.exports = (req, res, next) => {    
    res.sendError = (data, msg = "Internal Server Error") => {
        err && console.log(`[ERROR]: ${err}`)
        res.send({
            success: false,
            data
        })
    };

    res.sendResponse = (data, msg) => {
        try {
            msg && console.log(msg);
            res.send({
                success: true,
                data
            });
        } catch(err) {
            res.sendError(err);
        }
    };

    next();
};