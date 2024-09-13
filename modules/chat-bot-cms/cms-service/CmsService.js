const 
  fs = require('fs'),
  path = require('path'),
  commonUtils = require("../../../utils/common.helper"),
  authRepository = require("../../../repositories/auth.repositories"),
  { SUCCESS, FAILED_RETRIVE_CODE } = require("../../../constants/error.constant"),
  chatBotCmsRepository = require("../../../repositories/chat-bot-cms.repositories"),
  { SUCCESS_MSG, LANGUAGE_EXISTS, PRODUCT_EXISTS, ORGANIZATION_EXISTS, CONFIGURATION_EXISTS  } = require("../../../constants/error-message.constant");
  

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
  | Function to get dashboard details
  |------------------------------------------
  */
  getDashboardDetails(request, response, next) {
    chatBotCmsRepository.getDashboardDetails().then(async (data) => {
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: {
            data_count: data,
            profile_data:  await this.getUserDetails(request),
            organizations: await chatBotCmsRepository.getOrganization(request)
          }
        });
    }).catch((error) => {
      next(new Error(`CmsService : getDashboardDetails Method : ${error}`));
    }); 
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
  | Function to get searchOrganization
  |------------------------------------------
  */
  searchOrganization(request, response, next) {
    chatBotCmsRepository.searchOrganization(request).then(async (data) => {
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: {
            organization: data,
          }
        });
    }).catch((error) => {
      next(new Error(`CmsService : searchOrganization Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to get getProductsByOrganization
  |------------------------------------------
  */
  getProductsByOrganization(request, response, next) {
    chatBotCmsRepository.getProductsByOrganization(request).then(async (data) => {
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: {
            products: data
          }
        });
    }).catch((error) => {
      next(new Error(`CmsService : getProductsByOrganization Method : ${error}`));
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
  | Function to get configurations
  |------------------------------------------
  */
  getConfigurations(request, response, next) {
    chatBotCmsRepository.getConfigurations(request).then(async (data) => {
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: {
            config: data,
            profile_data:  await this.getUserDetails(request),
          }
        });
    }).catch((error) => {
      next(new Error(`CmsService : getLanguages Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to get submission
  |------------------------------------------
  */
  getSubmission(request, response, next) {
    chatBotCmsRepository.getSubmission(request).then(async (data) => {
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: {
            submission: data,
            profile_data:  await this.getUserDetails(request),
          }
        });
    }).catch((error) => {
      next(new Error(`CmsService : getSubmission Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to get languages
  |------------------------------------------
  */
  languageMaster(request, response, next) {
    chatBotCmsRepository.languageMaster().then(async (data) => {
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: {
            language_master: data
          }
        });
    }).catch((error) => {
      next(new Error(`CmsService : languageMaster Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to get Questions
  |------------------------------------------
  */
  getQuestions(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.getQuestions(reqData).then(async (data) => {
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
  |-------------------------------------------------
  | Function to get language by organization & product
  |-------------------------------------------------
  */
  getLanguageByOrganizationAndPrduct(request, response, next) {
    chatBotCmsRepository.getLanguageByOrganizationAndPrduct(request).then((data) => {
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: data 
        });
    }).catch((error) => {
      next(new Error(`CmsService : getLanguageByOrganizationAndPrduct Method : ${error}`));
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
        return response.json({ code: FAILED_RETRIVE_CODE, message: ORGANIZATION_EXISTS, data: [] });
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
    const mappId = commonUtils.generateToken(5);
    chatBotCmsRepository.addQuestion(request, mappId).then((data) => {
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
  | Function to add Languages
  |------------------------------------------
  */
  async addLanguages(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.addLanguages(reqData).then((data) => {
      if (data == 1) {
          return response.json({ code: FAILED_RETRIVE_CODE, message: LANGUAGE_EXISTS, data: [] });
      }
      return response.json({ code: SUCCESS, message: SUCCESS_MSG, data: data });
    }).catch((error) => {
      next(new Error(`CmsService : addLanguages Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to add Configurations
  |------------------------------------------
  */
  async addConfigurations(request, response, next) {
    const reqData = request.body.data;
    let reqBody = {
      "organization_id" : reqData.organization_code,
      "product_id" : reqData.product_code,
      "session_key" : reqData.session_key,
      "bot_id" : commonUtils.generateUniqueId(),
      "api_key" : commonUtils.generateApiKey(),
      "status" : 1
    };
    chatBotCmsRepository.addConfigurations(reqBody).then((data) => {
      if (data == 1) {
          return response.json({ code: FAILED_RETRIVE_CODE, message: CONFIGURATION_EXISTS, data: [] });
      }
      return response.json({ code: SUCCESS, message: SUCCESS_MSG, data: data });
    }).catch((error) => {
      next(new Error(`CmsService : addConfigurations Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to search questions
  |------------------------------------------
  */
  searchQuestion(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.getQuestions(reqData).then((data) => {
      return response.json({
        code: SUCCESS,
        message: SUCCESS_MSG,
        data: data 
      });
    }).catch((error) => {
      next(new Error(`CmsService : searchQuestion Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to search searchQuestionMapping
  |------------------------------------------
  */
  searchQuestionMapping(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.searchQuestionMapping(reqData).then(async (data) => {
      return response.json({
        code: SUCCESS,
        message: SUCCESS_MSG,
        data: {
          data: data,
          profile_data: await this.getUserDetails(request)
        }
      });
    }).catch((error) => {
      next(new Error(`CmsService : searchQuestionMapping Method : ${error}`));
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
  async getUserDetails(request, response, next) {
    const userDetails = await authRepository.getUserById(request)
    try {
      const folderPath = path.join(this.uploadsPath, 'uploads', 'user', 'profile', request.user.user_id.toString());
      const files = await fs.promises.readdir(folderPath);
      return {
        user_id: request.user.user_id,
        username: userDetails.username,
        email: userDetails.email,
        phone_number: userDetails.phone_number,
        url: files.length > 0 ? files[0] : ''
      };
    } catch (err) {
      return { 
        user_id: request.user.user_id,
        username: userDetails.username,
        email: userDetails.email,
        phone_number: userDetails.phone_number,
        url: ''
       };
    }
  }
  /*
  |------------------------------------------
  | Function to update Organization details
  |------------------------------------------
  */
  async updateOrganizationDetails(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.updateOrganization(reqData.organization_id, reqData).then((data) => {
      return response.json({
        code: SUCCESS,
        message: SUCCESS_MSG,
        data: data 
      });
    }).catch((error) => {
      next(new Error(`CmsService : updateOrganization Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to update Organization details
  |------------------------------------------
  */
  async deleteOrganizationDetails(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.deleteOrganization(reqData.organization_id).then((data) => {
      return response.json({
        code: SUCCESS,
        message: SUCCESS_MSG,
        data: data 
      });
    }).catch((error) => {
      next(new Error(`CmsService : deleteOrganizationDetails Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to update product details
  |------------------------------------------
  */
  async updateProductDetails(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.updateProductDetails(reqData.product_id, reqData).then((data) => {
      return response.json({
        code: SUCCESS,
        message: SUCCESS_MSG,
        data: data 
      });
    }).catch((error) => {
      next(new Error(`CmsService : updateProductDetails Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to update product details
  |------------------------------------------
  */
  async deleteProductDetails(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.deleteProductDetails(reqData.product_id).then((data) => {
      return response.json({
        code: SUCCESS,
        message: SUCCESS_MSG,
        data: data 
      });
    }).catch((error) => {
      next(new Error(`CmsService : deleteProductDetails Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to update question details
  |------------------------------------------
  */
  async updateQuestionDetails(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.updateQuestionDetails(reqData.question_id, reqData).then(async (data) => {
      const questionData = await chatBotCmsRepository.getQuestions(reqData);
      return response.json({
        code: SUCCESS,
        message: SUCCESS_MSG,
        data: questionData 
      });
    }).catch((error) => {
      next(new Error(`CmsService : updateQuestionDetails Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to update question details
  |------------------------------------------
  */
  async deleteQuestionDetails(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.deleteQuestionDetails(reqData.question_id).then(async (data) => {
      const questionData = await chatBotCmsRepository.getQuestions(reqData);
      return response.json({
        code: SUCCESS,
        message: SUCCESS_MSG,
        data: questionData 
      });
    }).catch((error) => {
      next(new Error(`CmsService : deleteQuestionDetails Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to update language details
  |------------------------------------------
  */
  async updateLanguageDetails(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.updateLanguageDetails(reqData.language_id, reqData).then((data) => {
      return response.json({
        code: SUCCESS,
        message: SUCCESS_MSG,
        data: data 
      });
    }).catch((error) => {
      next(new Error(`CmsService : updateLanguageDetails Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to update language details
  |------------------------------------------
  */
  async deleteLanguageDetails(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.deleteLanguageDetails(reqData.language_id).then((data) => {
      return response.json({
        code: SUCCESS,
        message: SUCCESS_MSG,
        data: data 
      });
    }).catch((error) => {
      next(new Error(`CmsService : deleteLanguageDetails Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to update configuration details
  |------------------------------------------
  */
  async updateConfigDetails(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.updateConfigDetails(reqData.config_id, reqData).then((data) => {
      return response.json({
        code: SUCCESS,
        message: SUCCESS_MSG,
        data: data 
      });
    }).catch((error) => {
      next(new Error(`CmsService : updateConfigDetails Method : ${error}`));
    }); 
  }
  /*
  |------------------------------------------
  | Function to update configuration details
  |------------------------------------------
  */
  async deleteConfigDetails(request, response, next) {
    const reqData = request.body.data;
    chatBotCmsRepository.deleteConfigDetails(reqData.config_id).then((data) => {
      return response.json({
        code: SUCCESS,
        message: SUCCESS_MSG,
        data: data 
      });
    }).catch((error) => {
      next(new Error(`CmsService : deleteConfigDetails Method : ${error}`));
    }); 
  }
}
module.exports = CmsService;