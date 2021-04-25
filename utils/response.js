module.exports = (req, res, next) => {    
    res.sendError = (msg = "Internal Server Error", err) => {
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