const 
  chatBotConfig = require("../entities/chat-bot-config.entities"),
  chatBotProduct = require("../entities/chat-bot-product.entities"),
  chatBotLangages = require("../entities/chat-bot-language.entities"),
  chatBotQuestion = require("../entities/chat-bot-questions.entities");
  

async function chatConfig(request) {
  try {
    const reqData = request.body.data;
    const apiKey = request.header("api-key");
    return await chatBotConfig.findOne({ bot: reqData.bot, api_key: apiKey });
  } catch (error) {
    throw new Error(`ChatBot Repository chatConfig Method : ${error}`);
  }
}

async function bootQuestion(request) {
  try {
    const reqData = request.body.data;
    const productCode = await chatBotProduct.find({ product_code: reqData.product_code });
    const question = await chatBotQuestion.findOne({ product_id: productCode[0]._id.toString(), language: reqData.language });
    const language = await chatBotLangages.find();
    return {
      question : question,
      language: language
    }
  } catch (error) {
    throw new Error(`ChatBot Repository bootQuestion Method : ${error}`);
  }
}

async function loadQuestion(request) {
  try {
    const reqData = request.body.data;
    return await chatBotQuestion.findOne({ question_id: reqData.qCode, language: reqData.qLanguage });
  } catch (error) {
    throw new Error(`ChatBot Repository loadQuestion Method : ${error}`);
  }
}

module.exports = {
  boot: bootQuestion,
  getQuestion: loadQuestion,
  chatConfig: chatConfig
};