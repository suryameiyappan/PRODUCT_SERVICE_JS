const 
  chatBotProduct = require("../entities/chat-bot-product.entities"),
  chatBotLangages = require("../entities/chat-bot-language.entities"),
  chatBotQuestion = require("../entities/chat-bot-questions.entities"),
  chatBotComapanies = require("../entities/chat-bot-organization.entities");

async function getOrganization(request) {
  try {
    return await chatBotComapanies.find();
  } catch (error) {
    throw new Error(`ChatBotCms Repository getOrganization Method : ${error}`);
  }
}

async function getProducts(request) {
  try {
    const products = await chatBotProduct.find();
    const organization = await chatBotComapanies.find();
    return {
      products: products,
      organization: organization
    }
  } catch (error) {
    throw new Error(`ChatBotCms Repository getProducts Method : ${error}`);
  }
}

async function getLanguages(request) {
  try {
    return await chatBotLangages.find();
  } catch (error) {
    throw new Error(`ChatBotCms Repository getLanguages Method : ${error}`);
  }
}

async function getQuestions(request) {
  try {
    const questions = await chatBotQuestion.find();
    const organization = await chatBotComapanies.find();
    return {
      questions: questions,
      organization: organization
    }
  } catch (error) {
    throw new Error(`ChatBotCms Repository getLanguages Method : ${error}`);
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

async function addQuestion(request){
  try {
    request.question.forEach(async element => {
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

async function addOrganization(request){
  try {
    const countOrganization = await chatBotComapanies.countDocuments({ 
      organization_code: request.organization_code,
      organization_name: request.organization_name
    });
    if (countOrganization == 1) return countOrganization;
    return await chatBotComapanies.create(request);
  } catch (error) {
    throw new Error(`ChatBotCms Repository addOrganization Method : ${error}`);
  }
}

async function getProductCode(productCode) {
  try {
    return await chatBotProduct.findOne({ product_code: productCode });
  } catch (error) {
    throw new Error(`ChatBot Repository getProductCode Method : ${error}`);
  }
}

async function searchQuestion(productCode) {
  try {
    const product = await chatBotProduct.findOne({ product_code: productCode.product_code });
    return await chatBotQuestion.find({ product_id: product._id.toString() });
  } catch (error) {
    throw new Error(`ChatBot Repository searchQuestion Method : ${error}`);
  }
}

async function updateQuestionCode(qusestionMapId, productId, updateData) {
  try {
    const product = await chatBotProduct.findOne({ product_code: productId });
    return await chatBotQuestion.updateMany(
      { question_map_id: qusestionMapId, product_id: product._id.toString() },
      { $set: updateData }
    );
  } catch (error) {
    throw new Error(`ChatBot Repository updateQuestionCode Method : ${error}`);
  }
}

async function updateQuestionOptionCode(reqData) {
  try {
    const product = await chatBotProduct.findOne({ product_code: reqData.product_code });
    const filter = { 
      question_map_id: reqData.qcode_map_id, 
      product_id: product._id.toString()
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

module.exports = {
  getOrganization: getOrganization,
  addOrganization: addOrganization,
  addProduct: addProduct,
  getProducts: getProducts,
  getLanguages: getLanguages,
  getQuestions: getQuestions,
  getProductCodeByOrganization: getProductCodeByOrganization,
  addQuestion: addQuestion,
  getProductCode: getProductCode,
  searchQuestion: searchQuestion,
  updateQuestionCode: updateQuestionCode,
  updateQuestionOptionCode: updateQuestionOptionCode
};