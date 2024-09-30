const
  Log = require("../config/app-config/logger.config"),
  chatBotConfig = require("../entities/chat-bot-config.entities"),
  chatBotLanguages = require("../entities/chat-bot-language.entities"),
  chatBotQuestion = require("../entities/chat-bot-questions.entities"),
  chatBotSubmissions = require("../entities/chat-bot-submissions.entities");
  

async function chatConfig(request) {
  try {
    const reqData = request.body.data;
    const apiKey = request.header("api-key");
    return await chatBotConfig.findOne({ bot_id: reqData.bot, api_key: apiKey });
  } catch (error) {
    throw new Error(`ChatBot Repository chatConfig Method : ${error}`);
  }
}

async function bootQuestion(request, configData) {
  try {
    const reqData = request.body.data;
    const question = await chatBotQuestion.findOne({ product_id: configData.product_id, language: reqData.language });
    const language = await chatBotLanguages.find();
    return {
      config: configData,
      question : question,
      language: language
    }
  } catch (error) {
    throw new Error(`ChatBot Repository bootQuestion Method : ${error}`);
  }
}

async function loadQuestion(reqData) {
  try {
    return await chatBotQuestion.findOne({ question_id: reqData.qCode, language: reqData.qLanguage });
  } catch (error) {
    throw new Error(`ChatBot Repository loadQuestion Method : ${error}`);
  }
}

async function checkQuestionModule(reqData) {
  try {
    return await chatBotQuestion.findOne({ _id: reqData.chatUId, language: reqData.qLanguage });
  } catch (error) {
    throw new Error(`ChatBot Repository checkQuestionModule Method : ${error}`);
  }
}

async function questionAnswerCreate(reqData, previousQuestion) {
  try {
    return await chatBotSubmissions.create({ 
      organization_id: previousQuestion.organization_id, 
      product_id: previousQuestion.product_id, 
      question_id: previousQuestion._id,
      question_language: reqData.qLanguage,
      question_code: reqData.qCode,
      bot_question: previousQuestion.question.question,
      received_message: reqData.message,
      page_url: reqData.page_url,
      timestamp_client: reqData.timestamp
    });
  } catch (error) {
    throw new Error(`ChatBot Repository questionAnswerCreate Method : ${error}`);
  }
}

module.exports = {
  boot: bootQuestion,
  chatConfig: chatConfig,
  getQuestion: loadQuestion,
  checkQuestionModule, checkQuestionModule,
  questionAnswerCreate: questionAnswerCreate

};