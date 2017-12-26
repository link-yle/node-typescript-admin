module.exports = app => {
    // catch 404 and forward to error handler

    app.use(function (err, req, res, next) {
        if(err.isJoi){
            err.isJoi = undefined
            err._object = undefined
            return res.status(422).send(err).end()
        }
        if(err.nF) {
            return res.status(404).send({error: `${err.nF} is not found in our system`})
        }
                
        else if (err.code === 11000 && err.index === 0) return res.status(409).json('Email already exists')
        else if(err.name === 'ResourceNotFound')  {
            return res.status(204).send(err.message)
        } else next(err)

    });

    // app.use(function (err, req, res, next) {
    //     if(err.name = 'CastError')  {
    //         return res.status(422).send('Please send proper input')
    //     } else next(err)

    // });



    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    
    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });


}