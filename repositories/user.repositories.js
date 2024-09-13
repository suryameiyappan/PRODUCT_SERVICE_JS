const 
  model = require("../models"),
  { Users } = model;

async function getUserDetails(userId) {
  try {
    return await Users.findOne({
      where: {
        id : userId
      },
    });
  } catch (error) {
    throw new Error(`Auth Repository getUser Method : ${error}`);
  }
}

module.exports = {
  getUser: getUserDetails
};
