module.exports = (req, res, next) => {    
    res.sendError = (err, msg = "Internal Server Error") => {
        err && console.log(`[ERROR]: ${err}`)
        res.send({
            success: false,
            msg
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