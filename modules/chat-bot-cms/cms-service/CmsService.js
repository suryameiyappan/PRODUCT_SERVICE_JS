const 
  fs = require('fs'),
  path = require('path'),
  { generateToken } = require("../../../utils/common.helper"),
  authRepository = require("../../../repositories/auth.repositories"),
  { SUCCESS, FAILED_RETRIVE_CODE } = require("../../../constants/error.constant"),
  chatBotCmsRepository = require("../../../repositories/chat-bot-cms.repositories"),
  { SUCCESS_MSG, PRODUCT_EXISTS, COMPANY_EXISTS  } = require("../../../constants/error-message.constant");
  

class CmsService {
  /*
  |------------------------------------------
  | Constructor
  |------------------------------------------
  */
  constructor() {
    this.rootDir = path.resolve(__dirname, '../../../');
    this.uploadsPath = path.join(this.rootDir, 'public');
  }
  /*
  |------------------------------------------
  | Function to get organization
  |------------------------------------------
  */
  getOrganization(request, response, next) {
    chatBotCmsRepository.getOrganization(request).then(async (data) => {
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: {
            organization: data,
            profile_data:  await this.getUserDetails(request),
          }
        });
    }).catch((error) => {
      next(new Error(`CmsService : getOrganization Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to get products
  |------------------------------------------
  */
  getProducts(request, response, next) {
    chatBotCmsRepository.getProducts(request).then(async (data) => {
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: {
            product: data,
            profile_data:  await this.getUserDetails(request),
          }
        });
    }).catch((error) => {
      next(new Error(`CmsService : getProducts Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to get languages
  |------------------------------------------
  */
  getLanguages(request, response, next) {
    chatBotCmsRepository.getLanguages(request).then(async (data) => {
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: {
            language: data,
            profile_data:  await this.getUserDetails(request),
          }
        });
    }).catch((error) => {
      next(new Error(`CmsService : getLanguages Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to get Questions
  |------------------------------------------
  */
  getQuestions(request, response, next) {
    chatBotCmsRepository.getQuestions(request).then(async (data) => {
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: {
            question: data,
            profile_data:  await this.getUserDetails(request),
          }
        });
    }).catch((error) => {
      next(new Error(`CmsService : getQuestions Method : ${error}`));
    }); 
  }
/*
|------------------------------------------
| Function to get product code by companie id
|------------------------------------------
*/
  getProductCodeByOrganization(request, response, next) {
    chatBotCmsRepository.getProductCodeByOrganization(request).then((data) => {
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: data 
        });
    }).catch((error) => {
      next(new Error(`CmsService : getProductCodeByOrganization Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to add Organization
  |------------------------------------------
  */
  async addOrganization(request, response, next) {
    const reqData = request.body.data;
    let reqBody = {
      "organization_code" : reqData.organization_code,
      "organization_name" : reqData.organization_name,
      "status" : 1
    };
    chatBotCmsRepository.addOrganization(reqBody).then((data) => {
      if (data == 1) {
        return response.json({ code: FAILED_RETRIVE_CODE, message: COMPANY_EXISTS, data: [] });
      }
      return response.json({ code: SUCCESS, message: SUCCESS_MSG, data: data });
    }).catch((error) => {
      next(new Error(`CmsService : addOrganization Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to add Products
  |------------------------------------------
  */
  async addProducts(request, response, next) {
    const reqData = request.body.data;
    let reqBody = {
      "organization_id" : reqData.organization_code,
      "product_code" : reqData.product_code,
      "product_name" : reqData.product_name,
      "status" : 1
    };
    chatBotCmsRepository.addProduct(reqBody).then((data) => {
      if (data == 1) {
          return response.json({ code: FAILED_RETRIVE_CODE, message: PRODUCT_EXISTS, data: [] });
      }
      return response.json({ code: SUCCESS, message: SUCCESS_MSG, data: data });
    }).catch((error) => {
      next(new Error(`CmsService : addProduct Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to get product code by companie id
  |------------------------------------------
  */
  async addQuestion(request, response, next) {
    const reqData = request.body.data;
    const productCode = await chatBotCmsRepository.getProductCode(reqData.product_id);
    const questionMapId = generateToken(5);
    reqData.question.forEach(element => {
      element['product_id'] = productCode._id.toString();
      element['question_map_id'] = questionMapId;
      element['question'] = { "id": 1, "active": true, "question": element.question };
    });
    chatBotCmsRepository.addQuestion(reqData).then((data) => {
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: [] 
        });
    }).catch((error) => {
      next(new Error(`CmsService : addQuestion Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to search questions
  |------------------------------------------
  */
  searchQuestion(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.searchQuestion(reqData).then((data) => {
      return response.json({
        code: SUCCESS,
        message: SUCCESS_MSG,
        data: data 
      });
    }).catch((error) => {
      next(new Error(`CmsService : addQuestion Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to update questions code 
  |------------------------------------------
  */
  updateQuestionCode(request, response, next) {
    const reqData = request.body.data;
    let reqBody = {
        "question_id" : reqData.question_code,
        "next_question_id" : reqData.next_question_code
    };
    chatBotCmsRepository.updateQuestionCode(reqData.qcode_map_id, reqData.product_code, reqBody).then((data) => {
      return response.json({
        code: SUCCESS,
        message: SUCCESS_MSG,
        data: data 
      });
    }).catch((error) => {
      next(new Error(`CmsService : updateQuestionCode Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to update questions option code 
  |------------------------------------------
  */
  updateQuestionOptionCode(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.updateQuestionOptionCode(reqData).then((data) => {
      return response.json({
        code: SUCCESS,
        message: SUCCESS_MSG,
        data: data 
      });
    }).catch((error) => {
      next(new Error(`CmsService : updateQuestionOptionCode Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to get user image
  |------------------------------------------
  */
  async getUserDetails(request) {
    const userDetails = await authRepository.getUserById(request)
    try {
      const folderPath = path.join(this.uploadsPath, 'uploads', 'user', 'profile', request.user.user_id.toString());
      const files = await fs.promises.readdir(folderPath);
      return {
        user_id: request.user.user_id,
        username: userDetails.userDetails,
        email: userDetails.email,
        phone_number: userDetails.phone_number,
        url: files.length > 0 ? files[0] : ''
      };
    } catch (err) {
      console.error('Error reading directory:', err);
      return { 
        user_id: request.user.user_id,
        username: userDetails.userDetails,
        email: userDetails.email,
        phone_number: userDetails.phone_number,
        url: ''
       };
    }
  }
}
module.exports = CmsService;