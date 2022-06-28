const asyncWrapper = (func) => {
    return async(request, response, next) => {
        try{
            await func(request, response, next);
        } catch(error){
            next(error)
        }
    }
}


module.exports = asyncWrapper