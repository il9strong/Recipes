class ErrorResponse {
    constructor(message) {
      this.statusCode = 500;
      this.message = message;
      this.successful = false;
    }
  
    send(res) {
      res.status(this.statusCode).json({
        successful: this.successful,
        statusCode: this.statusCode,
        message: this.message,
      });
    }
  };


  class SuccessResponse {
    constructor(message) {
      this.statusCode = 200;
      this.message = message;
      this.successful = true;
    }
  
    send(res, reqBody) {
      res.status(this.statusCode).json({
        successful: this.successful,
        statusCode: this.statusCode,
        message: this.message,
        requestBody: reqBody,
      });
    }
  }




module.exports = { ErrorResponse, SuccessResponse };