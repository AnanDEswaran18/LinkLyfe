const {constants} = require('../constants');
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json(
        { 
            title: "Validation failed",
            message: err.message, 
            stackTrace: err.stack 
        });
        break;
    case constants.NOT_FOUND:
       res.json(
        {
            title: "Not found",
            message: err.message,
            stackTrace: err.stack
        }); 
        break;
    case constants.FORBIDDEN:
        res.json(
       { 
            title: "FORBIDDEN",
            message: err.message, 
            stackTrace: err.stack 
        });
        break;
    case constants.INTERNAL_SERVER_ERROR:
        res.json(
       { 
            title: "INTERNAL SERVER ERROR",
            message: err.message, 
            stackTrace: err.stack 
        });
        break;
        case constants.UNAUTHORISED:
            res.json(
           { 
                title: "UNAUTHORISED",
                message: err.message, 
                stackTrace: err.stack 
            });
            break;
    default:
        console.log("Error handler called with status code: " + statusCode);
        break;
  }
};

module.exports = errorHandler;
