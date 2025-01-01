const userDetails=require('../Data/details.js');
module.exports= function getDetails() {
    console.log("getDetails() called");
    console.log(userDetails);
    return userDetails;
}