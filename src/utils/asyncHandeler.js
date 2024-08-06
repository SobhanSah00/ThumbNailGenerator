const asyncHandeler = (requesHandeler) => {
    return async (req, res, next) => {
        Promise.resolve(
            requesHandeler(req,res,next)
        ).catch((err) => next(err))
        
    }
}

export {asyncHandeler}