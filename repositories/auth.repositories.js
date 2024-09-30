const 
  model = require("../models"),
  { Users } = model;

async function registerUser(userData) {
  try {
    const userExistCheck = await Users.count({
      where: {
        email : userData.email
      },
    });
    if (userExistCheck === 1) return userExistCheck;
    return await Users.create(userData);
  } catch (error) {
    throw new Error(`Auth Repository registerUser Method : ${error}`);
  }
}

async function getUserName(loginData) {
  try {
    return await Users.findOne({
      where: {
        email : loginData.email,
        is_verified : 1
      },
    });
  } catch (error) {
    throw new Error(`Auth Repository getUser Method : ${error}`);
  }
}

async function updateVerifyStatus(verifyToken) {
  try {
    const getUserDetails = await Users.findOne({
      where: {
        verify_token : verifyToken,
        is_verified : 0
      },
    });
    if (getUserDetails === null) return getUserDetails;
    getUserDetails.is_verified = 1;
    return await getUserDetails.save();
  } catch (error) {
    throw new Error(`Auth Repository updateVerifyStatus Method : ${error}`);
  }
}

async function forgotPassword(reqBody) {
  try {
    const getuserName = await Users.findOne({
      where: {
        email : reqBody.email
      },
    });
    if (getuserName === null) return getuserName;
    getuserName.password = reqBody.password;
    return await getuserName.save();
  } catch (error) {
    throw new Error(`Auth Repository forgotPassword Method : ${error}`);
  }
}

async function getUserById(request) {
  try {
    return await Users.findOne({
      where: {
        id : request.user.user_id
      },
    });
  } catch (error) {
    throw new Error(`Auth Repository getUserById Method : ${error}`);
  }
}

module.exports = {
  registerUser: registerUser,
  getUserById: getUserById,
  getAuthUser: getUserName,
  updateVerification: updateVerifyStatus,
  forgotPassword: forgotPassword
};
