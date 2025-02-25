const userDetails=require('../Data/details.js');
function getDetails() {
    console.log("getDetails() called");
    console.log(userDetails);
    return userDetails;
}
function getDetailsByPublicService(){
    userDetails.projects=userDetails.projects.filter(project=>project.isPublic);
    return userDetails;
}
module.exports = { getDetails,getDetailsByPublicService };