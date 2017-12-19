module.exports = function setErrorHandlers(app) {
    // catch 404 and forward to error handler

    app.use(function (err, req, res, next) {
        if(err.name === 'ResourceNotFound')  {
            return res.status(404).send(err.message)
        } else next(err)

    });

    app.use(function (err, req, res, next) {
        if(err.name = 'CastError')  {
            return res.status(422).send('Please send proper input')
        } else next(err)

    });



    app.use(function (req, res, next) {
        global.log.error('eeeeeeeeeeeeeeeeeeee')
        
        
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    // app.use(function (err, req, res, next) {
    //     // set locals, only providing error in development
    //     res.locals.message = err.message;
    //     res.locals.error = err;

    //     // render the error page
    //     res.status(err.status || 500);
    //     res.render('error');
    // });


    app.use(function (req, res, next) {
        return res.status(411)
    });

}