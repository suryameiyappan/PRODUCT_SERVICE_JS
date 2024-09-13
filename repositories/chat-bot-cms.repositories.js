const 
  mongoose = require('mongoose'),
  chatBotConfig = require("../entities/chat-bot-config.entities"),
  chatBotProduct = require("../entities/chat-bot-product.entities"),
  chatBotLanguages = require("../entities/chat-bot-language.entities"),
  chatBotQuestion = require("../entities/chat-bot-questions.entities"),
  chatBotSubmissions = require("../entities/chat-bot-submissions.entities"),
  chatBotOrganization = require("../entities/chat-bot-organization.entities"),
  chatBotLanguageMaster = require("../entities/chat-bot-language-master.entities"),
  chatBotQuestionMapping = require("../entities/chat-bot-question-mapping.entities");
  
  
async function getDashboardDetails() {
  try {
    const [organization, product, question, organization_active, product_active, question_active] = await Promise.all([
      chatBotOrganization.countDocuments(),
      chatBotProduct.countDocuments(),
      chatBotQuestion.countDocuments(),
      chatBotOrganization.countDocuments({ status: '1' }),
      chatBotProduct.countDocuments({ status: '1' }),
      chatBotQuestion.countDocuments({ status: '1' })
    ]);
    return {
      product: product,
      organization: organization,
      question: question,
      organization_active: organization_active,
      product_active: product_active,
      question_active: question_active
    }
  } catch (error) {
    throw new Error(`ChatBotCms Repository getDashboardDetails Method : ${error}`);
  }
}

async function getOrganization(request) {
  try {
    let reqData = request.body.data;
    const [totalLength, organization] = await Promise.all([
      chatBotOrganization.countDocuments(),
      chatBotOrganization.find()
        .skip(reqData.skip || 0)
        .limit(reqData.limit || 10)
        .exec()
    ]);
    return {
      totallength: totalLength,
      organization: organization
    }
  } catch (error) {
    throw new Error(`ChatBotCms Repository getOrganization Method : ${error}`);
  }
}

async function getProducts(request, limit = 5, skip = 0) {
  try {
    let reqData = request.body.data;
    const [organization, totalLength, products] = await Promise.all([
      chatBotOrganization.find(),
      chatBotProduct.countDocuments(),
      chatBotProduct.aggregate([
        { $lookup: { from: 'chatbot_organizations', localField: 'organization_id', foreignField: '_id', as: 'organization' } },
        { $unwind: { path: '$organization', preserveNullAndEmptyArrays: true } },
        { $project: {
            _id: 1,
            organization_id: 1,
            product_code: 1,
            product_name: 1,
            status: 1,
            organization_code: { $ifNull: ['$organization.organization_code', 'N/A'] },
          }
        },
        { $skip: reqData.skip || skip },
        { $limit: reqData.limit || limit }
      ]).exec()
    ]);

    return {
      totallength: totalLength,
      products: products,
      organization: organization
    }
  } catch (error) {
    throw new Error(`ChatBotCms Repository getProducts Method : ${error}`);
  }
}

async function getQuestions(reqData, skip = 0, limit = 10) {
  try {
    const matchConditions = {};
    if (reqData.search_oid && reqData.search_pid) {
      matchConditions.organization_id = new mongoose.Types.ObjectId(reqData.search_oid);
      matchConditions.product_id = new mongoose.Types.ObjectId(reqData.search_pid);
    }

    const [totalLength, questions, organization] = await Promise.all([
      chatBotQuestion.countDocuments(matchConditions),
      chatBotQuestion.aggregate([
        { $match: matchConditions },
        { $lookup: { from: 'chatbot_organizations', localField: 'organization_id', foreignField: '_id', as: 'organization' } },
        { $lookup: { from: 'chatbot_products', localField: 'product_id', foreignField: '_id', as: 'product' } },
        { $unwind: { path: '$organization', preserveNullAndEmptyArrays: true } },
        { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
        { $project: {
            _id: 1,
            organization_id: 1,
            product_id: 1,
            question_id: 1,
            next_question_id: 1,
            language: 1,
            question_type: 1,
            question_map_id: 1,
            question: 1,
            options: 1,
            validation: 1,
            status: 1,
            organization_code: { $ifNull: ['$organization.organization_code', 'N/A'] },
            product_code: { $ifNull: ['$product.product_code', 'N/A'] }
          }
        },
        { $skip: reqData.skip || skip },
        { $limit: reqData.limit || limit }
      ]).exec(),
      chatBotOrganization.find()
    ]);

    return {
      totallength: totalLength,
      questions: questions,
      organization: organization
    }
  } catch (error) {
    throw new Error(`ChatBotCms Repository getQuestions Method : ${error}`);
  }
}

async function searchQuestionMapping(reqData, skip = 0, limit = 10) {
  try {
    const matchConditions = {};
    if (reqData.search_oid && reqData.search_pid) {
      matchConditions.organization_id = new mongoose.Types.ObjectId(reqData.search_oid);
      matchConditions.product_id = new mongoose.Types.ObjectId(reqData.search_pid);
    }

    const [totalLength, questions, organization] = await Promise.all([
      chatBotQuestionMapping.countDocuments(matchConditions),
      chatBotQuestionMapping.aggregate([
        { $match: matchConditions },
        { $lookup: { from: 'chat_questions', localField: '_id', foreignField: 'question_map_id', as: 'question_data' } },
        { $unwind: { path: '$question_data', preserveNullAndEmptyArrays: true } },
        { $lookup: { from: 'chatbot_organizations', localField: 'organization_id', foreignField: '_id', as: 'organization' } },
        { $lookup: { from: 'chatbot_products', localField: 'product_id', foreignField: '_id', as: 'product' } },
        { $unwind: { path: '$organization', preserveNullAndEmptyArrays: true } },
        { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: {
              _id: '$_id',
              organization_id: '$organization_id',
              product_id: '$product_id',
              question_map_id: '$question_map_id',
              status: '$status',
              organization_code: '$organization_code',
              product_code: '$product_code'
            },
            question_data: { $push: '$question_data' },
            organization_code: { $first: '$organization.organization_code' },
            product_code: { $first: '$product.product_code' }
          }
        },
        {
          $project: {
            _id: '$_id._id',
            organization_id: '$_id.organization_id',
            product_id: '$_id.product_id',
            question_map_id: '$_id.question_map_id',
            status: '$_id.status',
            question_data: 1,
            organization_code: 1,
            product_code: 1,
            createdAt: 1
          }
        },
        { $sort: { _id: 1 } },
        { $skip: reqData.skip || skip },
        { $limit: reqData.limit || limit }
      ]).exec(),
      chatBotOrganization.find()
    ]);
    return {
      totallength: totalLength,
      questions: questions,
      organization: organization
    }
  } catch (error) {
    throw new Error(`ChatBotCms Repository searchQuestionMapping Method : ${error}`);
  }
}

async function getLanguages(request, skip = 0, limit = 10) {
  try {
    const reqData = request.body.data;
    const matchConditions = {};
    if (reqData.search_oid && reqData.search_pid) {
      matchConditions.organization_id = new mongoose.Types.ObjectId(reqData.search_oid);
      matchConditions.product_id = new mongoose.Types.ObjectId(reqData.search_pid);
    }

    const [totalLength, languages, organizations] = await Promise.all([
      chatBotLanguages.countDocuments(matchConditions),
      chatBotLanguages.aggregate([
        { $match: matchConditions },
        { $lookup: { from: 'chatbot_organizations', localField: 'organization_id', foreignField: '_id', as: 'organization' } },
        { $lookup: { from: 'chatbot_products', localField: 'product_id', foreignField: '_id', as: 'product' } },
        { $unwind: { path: '$organization', preserveNullAndEmptyArrays: true } },
        { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
        { $project: {
            _id: 1,
            organization_id: 1,
            product_id: 1,
            language: 1,
            language_name: 1,
            status: 1,
            organization_code: { $ifNull: ['$organization.organization_code', 'N/A'] },
            product_code: { $ifNull: ['$product.product_code', 'N/A'] }
          }
        },
        { $skip: reqData.skip || skip },
        { $limit: reqData.limit || limit }
      ]).exec(),
      chatBotOrganization.find()
    ]);

    return {
      totallength : totalLength,
      langauges : languages,
      organization : organizations
    };
  } catch (error) {
    throw new Error(`ChatBotCms Repository getLanguages Method : ${error}`);
  }
}

async function getConfigurations(request, limit = 5, skip = 0) {
  try {
    let reqData = request.body.data;
    let matchConditions = {};
    if (reqData.search_oid && reqData.search_pid) {
      matchConditions.organization_id = new mongoose.Types.ObjectId(reqData.search_oid);
      matchConditions.product_id = new mongoose.Types.ObjectId(reqData.search_pid);
    }

    const [organization, totalLength, configs] = await Promise.all([
      chatBotOrganization.find(),
      chatBotConfig.countDocuments(matchConditions),
      chatBotConfig.aggregate([
        { $match: matchConditions },
        { $lookup: { from: 'chatbot_organizations', localField: 'organization_id', foreignField: '_id', as: 'organization' } },
        { $lookup: { from: 'chatbot_products', localField: 'product_id', foreignField: '_id', as: 'product' } },
        { $unwind: { path: '$organization', preserveNullAndEmptyArrays: true } },
        { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
        { $project: {
            _id: 1,
            organization_id: 1,
            product_id: 1,
            bot_id: 1,
            api_key: 1,
            session_key: 1,
            status: 1,
            organization_code: { $ifNull: ['$organization.organization_code', 'N/A'] },
            product_code: { $ifNull: ['$product.product_code', 'N/A'] }
          }
        },
        { $skip: reqData.skip || skip },
        { $limit: reqData.limit || limit }
      ]).exec()
    ]);

    return {
      totallength: totalLength,
      configs: configs,
      organization: organization
    }
  } catch (error) {
    throw new Error(`ChatBotCms Repository getConfigurations Method : ${error}`);
  }
}

async function getSubmission(request, limit = 5, skip = 0) {
  try {
    let reqData = request.body.data;
    let matchConditions = {};
    if (reqData.search_oid && reqData.search_pid) {
      matchConditions.organization_id = new mongoose.Types.ObjectId(reqData.search_oid);
      matchConditions.product_id = new mongoose.Types.ObjectId(reqData.search_pid);
    }

    const [organization, totalLength, submissions] = await Promise.all([
      chatBotOrganization.find(),
      chatBotSubmissions.countDocuments(matchConditions),
      chatBotSubmissions.aggregate([
        { $match: matchConditions },
        { $lookup: { from: 'chatbot_organizations', localField: 'organization_id', foreignField: '_id', as: 'organization' } },
        { $lookup: { from: 'chatbot_products', localField: 'product_id', foreignField: '_id', as: 'product' } },
        { $unwind: { path: '$organization', preserveNullAndEmptyArrays: true } },
        { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
        { $project: {
            _id: 1,
            organization_id: 1,
            product_id: 1,
            question_language: 1,
            question_code: 1,
            bot_question: 1,
            received_message: 1,
            page_url: 1,
            organization_code: { $ifNull: ['$organization.organization_code', 'N/A'] },
            product_code: { $ifNull: ['$product.product_code', 'N/A'] }
          }
        },
        { $skip: reqData.skip || skip },
        { $limit: reqData.limit || limit }
      ]).exec()
    ]);

    return {
      totallength: totalLength,
      submissions: submissions,
      organization: organization
    }
  } catch (error) {
    throw new Error(`ChatBotCms Repository getConfigurations Method : ${error}`);
  }
}

async function searchOrganization(request) {
  try {
    let reqData = request.body.data;
    const searchPattern = new RegExp(reqData.searchValue, 'i');
    const query = {
      $or: [
        { organization_code: { $regex: searchPattern } },
        { organization_name: { $regex: searchPattern } }
      ]
    };
    const [totalLength, organization] = await Promise.all([
      chatBotOrganization.countDocuments(query),
      chatBotOrganization.find(query)
      .skip(reqData.skip || 0)
      .limit(reqData.limit || 10)
      .exec()
    ]);
    return {
      totallength: totalLength,
      organization: organization
    }
  } catch (error) {
    throw new Error(`ChatBotCms Repository getProductsByOrganization Method : ${error}`);
  }
}

async function getProductsByOrganization(request, skip = 0, limit = 5) {
  try {
    let reqData = request.body.data;
    const matchConditions = {};
    if (reqData.organization_id) {
      matchConditions.organization_id = new mongoose.Types.ObjectId(reqData.organization_id);
    }

    const [totalLength, products] = await Promise.all([
      chatBotProduct.countDocuments(matchConditions),
      chatBotProduct.aggregate([
        { $match: matchConditions },
        { $lookup: { from: 'chatbot_organizations', localField: 'organization_id', foreignField: '_id', as: 'organization' } },
        { $unwind: { path: '$organization', preserveNullAndEmptyArrays: true } },
        { $project: {
            _id: 1,
            organization_id: 1,
            product_code: 1,
            product_name: 1,
            status: 1,
            organization_code: { $ifNull: ['$organization.organization_code', 'N/A'] },
          }
        },
        { $skip: reqData.skip || skip },
        { $limit: reqData.limit || limit }
      ]).exec()
    ]);

    return {
      totallength: totalLength,
      products: products
    }
  } catch (error) {
    throw new Error(`ChatBotCms Repository getProductsByOrganization Method : ${error}`);
  }
}

async function getProductCodeByOrganization(request){
  try {
    const reqData = request.body.data;
    return await chatBotProduct.find({ organization_id: reqData.organization_code });
  } catch (error) {
    throw new Error(`ChatBotCms Repository getProductCodeByOrganization Method : ${error}`);
  }
}

async function getLanguageByOrganizationAndPrduct(request){
  try {
    const reqData = request.body.data;
    return await chatBotLanguages.find({
      organization_id: reqData.organization_code,
      product_id: reqData.product_code
       
    });
  } catch (error) {
    throw new Error(`ChatBotCms Repository getLanguageByOrganizationAndPrduct Method : ${error}`);
  }
}

async function addOrganization(request){
  try {
    const countOrganization = await chatBotOrganization.countDocuments({ 
      organization_code: request.organization_code
    });
    if (countOrganization == 1) return countOrganization;
    return await chatBotOrganization.create(request);
  } catch (error) {
    throw new Error(`ChatBotCms Repository addOrganization Method : ${error}`);
  }
}

async function addQuestion(request, questionMapId){
  try {
    const requestData = request.body.data;
    const mappingReq = {
      "organization_id" : requestData.organization_id,
      "product_id" : requestData.product_id,
      "question_map_id" : questionMapId,
      "status" : "1"
    }
    const mappingData = await chatBotQuestionMapping.create(mappingReq);

    requestData.question.forEach(element => {
      element['organization_id'] = requestData.organization_id;
      element['product_id'] = requestData.product_id;
      element['question_map_id'] = mappingData._id.toString();
      element['status'] = 1;
      element['question'] = { "id": 1, "active": true, "question": element.question };
    });
    requestData.question.forEach(async element => {
      await chatBotQuestion.create(element);
    });
    return true;
  } catch (error) {
    throw new Error(`ChatBotCms Repository addQuestion Method : ${error}`);
  }
}

async function addProduct(request){
  try {
    const countProducts = await chatBotProduct.countDocuments({ 
      product_code: request.product_code
    });
    if (countProducts == 1) return countProducts;
    return await chatBotProduct.create(request);
  } catch (error) {
    throw new Error(`ChatBotCms Repository addProduct Method : ${error}`);
  }
}

async function addLanguages(request){
  try {
    // const countLanguage = await chatBotLanguages.countDocuments({ 
    //   product_code: request.product_code
    // });
    // if (countLanguage == 1) return countLanguage;
    return await chatBotLanguages.insertMany(request.languages);
  } catch (error) {
    throw new Error(`ChatBotCms Repository addLanguages Method : ${error}`);
  }
}

async function addConfigurations(request){
  try {
    const countConfig = await chatBotConfig.countDocuments({ 
      organization_id: request.organization_id,
      product_id: request.product_id,
    });
    if (countConfig == 1) return countConfig;
    return await chatBotConfig.create(request);
  } catch (error) {
    throw new Error(`ChatBotCms Repository addConfigurations Method : ${error}`);
  }
}

async function getProductCode(productCode) {
  try {
    return await chatBotProduct.findOne({ _id: productCode });
  } catch (error) {
    throw new Error(`ChatBot Repository getProductCode Method : ${error}`);
  }
}

async function updateOrganization(organizationId, updateData) {
  try {
    return await chatBotOrganization.updateOne(
      { _id: organizationId },
      { $set: updateData.updateData }
    );
  } catch (error) {
    throw new Error(`ChatBot Repository updateOrganization Method : ${error}`);
  }
}

async function updateQuestionCode(qusestionMapId, productId, updateData) {
  try {
    return await chatBotQuestion.updateMany(
      { question_map_id: qusestionMapId, product_id: productId },
      { $set: updateData }
    );
  } catch (error) {
    throw new Error(`ChatBot Repository updateQuestionCode Method : ${error}`);
  }
}

async function updateQuestionOptionCode(reqData) {
  try {
    const filter = { 
      question_map_id: reqData.qcode_map_id, 
      product_id: reqData.product_code
    };
    for (const updateObj of reqData.question_option_code) {
      const update = {
        $set: {
          'question_id' : reqData.question_code,
          [`options.${updateObj.index}.question_id`]: updateObj.question_id,
          [`options.${updateObj.index}.next_question_id`]: updateObj.next_question_id
        }
      };
      await chatBotQuestion.updateMany(filter, update);
    }
  } catch (error) {
    throw new Error(`ChatBot Repository updateQuestionOptionCode Method : ${error}`);
  }
}

async function deleteOrganization(organizationId) {
  try {
    return await chatBotOrganization.findByIdAndDelete(organizationId);
  } catch (error) {
    throw new Error(`ChatBot Repository deleteOrganization Method : ${error}`);
  }
}

async function updateProductDetails(productId, updateData) {
  try {
    return await chatBotProduct.updateOne(
      { _id: productId },
      { $set: updateData.updateData }
    );
  } catch (error) {
    throw new Error(`ChatBot Repository updateProductDetails Method : ${error}`);
  }
}

async function deleteProductDetails(productId) {
  try {
    return await chatBotProduct.findByIdAndDelete(productId);
  } catch (error) {
    throw new Error(`ChatBot Repository deleteProductDetails Method : ${error}`);
  }
}

async function updateQuestionDetails(questionId, updateData) {
  try {
    return await chatBotQuestion.updateOne(
      { _id: questionId },
      { $set: updateData.updateData[0] }
    );
  } catch (error) {
    throw new Error(`ChatBot Repository updateQuestionDetails Method : ${error}`);
  }
}

async function deleteQuestionDetails(questionId) {
  try {
    const deleteQuestion = await chatBotQuestion.findByIdAndDelete(questionId);
    const checkMapiId = await chatBotQuestion.find({ question_map_id : deleteQuestion.question_map_id });
    if (checkMapiId.length === 0) {
      await chatBotQuestionMapping.findByIdAndDelete(deleteQuestion.question_map_id)
    }
    return deleteQuestion;
  } catch (error) {
    throw new Error(`ChatBot Repository deleteQuestionDetails Method : ${error}`);
  }
}

async function updateLanguageDetails(languageId, updateData) {
  try {
    return await chatBotLanguages.updateOne(
      { _id: languageId },
      { $set: updateData.updateData }
    );
  } catch (error) {
    throw new Error(`ChatBot Repository updateLanguageDetails Method : ${error}`);
  }
}

async function deleteLanguageDetails(languageId) {
  try {
    return await chatBotLanguages.findByIdAndDelete(languageId);
  } catch (error) {
    throw new Error(`ChatBot Repository deleteLanguageDetails Method : ${error}`);
  }
}

async function updateConfigDetails(configId, updateData) {
  try {
    return await chatBotConfig.updateOne(
      { _id: configId },
      { $set: updateData.updateData }
    );
  } catch (error) {
    throw new Error(`ChatBot Repository updateConfigDetails Method : ${error}`);
  }
}

async function deleteConfigDetails(configId) {
  try {
    return await chatBotConfig.findByIdAndDelete(configId);
  } catch (error) {
    throw new Error(`ChatBot Repository deleteConfigDetails Method : ${error}`);
  }
}

async function languageMaster() {
  try {
    return await chatBotLanguageMaster.find({ status: '1' });
  } catch (error) {
    throw new Error(`ChatBot Repository languageMaster Method : ${error}`);
  }
}

module.exports = {
  addProduct: addProduct,
  getProducts: getProducts,
  addQuestion: addQuestion,
  getLanguages: getLanguages,
  getQuestions: getQuestions,
  addLanguages: addLanguages,
  getSubmission: getSubmission,
  languageMaster: languageMaster,
  getProductCode: getProductCode,
  getOrganization: getOrganization,
  addOrganization: addOrganization,
  getConfigurations: getConfigurations,
  addConfigurations: addConfigurations,
  searchOrganization: searchOrganization,
  updateQuestionCode: updateQuestionCode,
  updateOrganization: updateOrganization,
  deleteOrganization: deleteOrganization,
  getDashboardDetails: getDashboardDetails,
  updateConfigDetails: updateConfigDetails,
  deleteConfigDetails: deleteConfigDetails,
  updateProductDetails: updateProductDetails,
  deleteProductDetails: deleteProductDetails,
  updateQuestionDetails: updateQuestionDetails,
  deleteQuestionDetails: deleteQuestionDetails,
  updateLanguageDetails: updateLanguageDetails,
  deleteLanguageDetails: deleteLanguageDetails,
  searchQuestionMapping: searchQuestionMapping,
  updateQuestionOptionCode: updateQuestionOptionCode,
  getProductsByOrganization: getProductsByOrganization,
  getProductCodeByOrganization: getProductCodeByOrganization,
  getLanguageByOrganizationAndPrduct: getLanguageByOrganizationAndPrduct
};