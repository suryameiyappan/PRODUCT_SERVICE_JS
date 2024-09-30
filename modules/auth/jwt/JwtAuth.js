const 
  bcrypt = require("bcrypt"),
  commonUtils = require("../../../utils/common.helper"),
  validator = require("../../../utils/validator.helper"),
  factoryUtils = require("../../../utils/factory.helper"),
  JwtProvider = require("../../../providers/jwt.provider"),
  Log = require("../../../config/app-config/logger.config"),
  { EMAIL } = require("../../../constants/component.constant"),
  authRepository = require("../../../repositories/auth.repositories"),
  { SUCCESS, FAILED_RETRIVE_CODE, VALIDATION } = require("../../../constants/error.constant"),
  {
    SUCCESS_MSG, DATA_INSERT, INVALID_CREDENTIALS, NO_RECORD_FOUND, DATA_UPDATED, VALIDATOR,
    LOG_OUT_SUCCESS, LOG_OUT_FAILURE, USERNAME_EXIST, USER_ALREADY_VERIFIED, FORGOT_PASS_SUCC_MSG
  } = require("../../../constants/error-message.constant");
  

class JwtAuth {
  /*
  |----------------------------
  | Constructor
  |----------------------------
  */
  constructor(jwtProvider = new JwtProvider) {
    this.jwtAuthProvider = jwtProvider;
  }
  /*
  |----------------------------
  | Function to register user
  |----------------------------
  */
  async register(request, response, next) {
    const validation = await validator.validator(request);
    if (validation) {
      return response.json({ 
        code: VALIDATION,  message: VALIDATOR, data: validation.details.map(error => error.message) 
      });
    }

    let reqBody = request.body.data;
    const userInfo = {
      username : reqBody.username,
      password : bcrypt.hashSync(reqBody.password, 10),
      email : reqBody.email,
      phone_number : reqBody.phone_number,
      is_verified : 0,
      verify_token : commonUtils.generateToken(53)
    };
    
    authRepository.registerUser(userInfo).then((data) => {
        if (data === 1) {
            return response.json({ 
              code: FAILED_RETRIVE_CODE, message: USERNAME_EXIST, data: [] 
            });
        }
        request.body = {
          "action": "authEmail",
          "data": {
            "template" : "register",
            "mailOptions": {
              "to": reqBody.email,
              "subject": "User Registeration"
            },
            "mailData": {
              "username": reqBody.username,
              "verify_url": process.env.CHATBOT_FRONT_END.concat("/auth/user/verify?token=", data.verify_token)
            }
          }
        };
        const emailResponse = factoryUtils.getComponent(EMAIL, request, response, next);
        Log.info("REGISTER EMAIL======>>" + JSON.stringify(emailResponse));
        return response.json({ 
          code: SUCCESS,  message: DATA_INSERT, data: data 
        });
    })
    .catch((error) => {
      next(new Error(`Authentication : register Method : ${error}`));
    });
  }
  /*
  |----------------------------
  | Function to Verrify User
  |----------------------------
  */
  async verification(request, response, next) {
    const validation = await validator.validator(request);
    if (validation) {
      return response.json({ 
        code: VALIDATION,  message: VALIDATOR, data: validation.details.map(error => error.message) 
      });
    }
    
    let reqBody = request.body.data;
    authRepository.updateVerification(reqBody.verify_token).then(async (data) => {
      if (data === null) {
        return response.json({ 
          code: FAILED_RETRIVE_CODE, message: USER_ALREADY_VERIFIED, data: [] 
        });
      }
      return response.json({ 
        code: SUCCESS,  message: DATA_UPDATED, data: [] 
      });
    }).catch((error) => {
      next(new Error(`Authentication : login Method : ${error}`));
    });
  }
  /*
  |----------------------------
  | Function to login user
  |----------------------------
  */
  async login(request, response, next) {
    const validation = await validator.validator(request);
    if (validation) {
      return response.json({
        code: VALIDATION,  message: VALIDATOR, data: validation.details.map(error => error.message) 
      });
    }

    let reqBody = request.body.data;
    authRepository.getAuthUser(reqBody).then(async (data) => {
        if (data === null) {
          return response.status(FAILED_RETRIVE_CODE).json({ 
            code: FAILED_RETRIVE_CODE, message: INVALID_CREDENTIALS, data: [] 
          });
        }
        const checkPassword = await bcrypt.compare(reqBody.password, data.password);
        if (!checkPassword) {
          return response.status(FAILED_RETRIVE_CODE).json({ 
            code: FAILED_RETRIVE_CODE, message: INVALID_CREDENTIALS, data: [] 
          });
        }
        const token = this.jwtAuthProvider.sign({ user_id: data.id });
        return response.json({ 
          code: SUCCESS, message: SUCCESS_MSG, data: token 
        });
    }).catch((error) => {
      next(new Error(`Authentication : login Method : ${error}`));
    }); 
  }
  /*
  |----------------------------
  | Function to Forgot Password
  |----------------------------
  */
  async forgotPassword(request, response, next) {
    const validation = await validator.validator(request);
    if (validation) {
      return response.json({
        code: VALIDATION,  message: VALIDATOR, data: validation.details.map(error => error.message) 
      });
    }

    let reqBody = request.body.data, newPassword = commonUtils.generateToken(8);
    const userInfo = {
      email : reqBody.email,
      password : bcrypt.hashSync(newPassword, 10)
    };

    authRepository.forgotPassword(userInfo).then(async (data) => {
        if (data === null) {
          return response.status(FAILED_RETRIVE_CODE).json({ 
            code: FAILED_RETRIVE_CODE, message: NO_RECORD_FOUND, data: [] 
          });
        }
        request.body = {
          "action": "authEmail",
          "data": { 
            "template" : "forgot-password",
            "mailOptions": {
              "to": data.email,
              "subject": "Forgot Password"
            },
            "mailData": {
              "username": data.username,
              "password": newPassword
            }
            
          }
        };
        const emailResponse = factoryUtils.getComponent(EMAIL, request, response, next);
        console.log("FORGOT PASSWORD EMAIL======>>" + JSON.stringify(emailResponse));
        return response.json({ 
          code: SUCCESS, message: FORGOT_PASS_SUCC_MSG, data: [] 
        });
    }).catch((error) => {
      next(new Error(`Authentication : forgotPassword Method : ${error}`));
    }); 
  }
  /*
  |----------------------------
  | Function to logout user
  |----------------------------
  */
  logout(request, response, next) {
    const token = request.header("Authorization") ? request.header("Authorization").split(" ")[1] : "";
    if (token && !request.logout.has(token)) {
      request.logout.add(token);
      return response.json({ message: LOG_OUT_SUCCESS });
    }
    return response.json({ message: LOG_OUT_FAILURE });
  }
  
}
module.exports = JwtAuth;
