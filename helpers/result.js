const ReturnMessage = require("./return_message");

module.exports = function result(isDone, res){
    if(isDone){
        res.send(ReturnMessage.success());
    }else{
        res.send(ReturnMessage.fail());
    }
}