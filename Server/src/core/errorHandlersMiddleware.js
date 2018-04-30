const mongoose = require('mongoose')
module.exports = app => {

    app.use(function (err, req, res, next) {
        console.log(err)        
        if (err.isJoi) {
            err.isJoi = undefined
            err._object = undefined
            return res.status(422).json(err)
        }
        else if (err.nF) {
            return res.status(404).json({msg: `${err.nF} is not found in our system` })
        }
        else if (err.name === 'NoUserFound') return res.status(404).json({msg: `This user does not exist in our system` })
        else if (err.code === 11000 && err.index === 0) return res.status(409).json({msg:'Email already exists'})
        else return next(err)
    });

    app.use(function (err, req, res, next) {
        if (err.name = 'CastError') {
            if (err instanceof mongoose.Error.CastError) {
                return res.status(422).json({msg:'Please send proper input'})
            }
            else return res.status(500).json({msg:'Internal Server Error'})
        } else return next(err)
    });


    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        err.message = 'No route was found'
        return next(err);
    });


    // error handler
    app.use(function (err, req, res, next) {
        
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        res.status(err.status || 500);
        
        return res.json({msg: err.message});
    });


}