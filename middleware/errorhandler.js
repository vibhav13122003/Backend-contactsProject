const { NOT_FOUND,
     BAD_REQUEST,
      INTERNAL_SERVER_ERROR,
       UNAUTHORIZED,
     FORBIDDEN } = require("../constant");

const errorHandler=(err,req,res,next)=>{
    const statusCode= res.statusCode ? res.statusCode : 500;
    switch(statusCode)
    {
        case NOT_FOUND:
            res.json({
                title:"Not Found",
                message:err.message,
                stackTrace:err.stack
            })
            break
        case BAD_REQUEST:
            res.json({
                title:"Validation Error",
                message:err.message,
                stackTrace:err.stack
            })
            break;
        case INTERNAL_SERVER_ERROR:
            res.json({
                title:"Internal Server Error",
                message:err.message,
                stackTrace:err.stack
            })
            break;
        case UNAUTHORIZED:
            res.json({
                title:"Unauthorized",
                message:err.message,
                stackTrace:err.stack
            })
            break;
        case FORBIDDEN:
            res.json({
                title:"Forbidden",
                message:err.message,
                stackTrace:err.stack
            })
        default:
            res.json({
                title:"Error",
                message:err.message,
                stackTrace:err.stack
            })
    }
    
}

module.exports=errorHandler