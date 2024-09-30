const 
  articleRepository = require("../../../repositories/article.repositories"),
  { SUCCESS, FAILED_RETRIVE_CODE } = require("../../../constants/error.constant"),
  {
    SUCCESS_MSG, ERROR_MSG
  } = require("../../../constants/error-message.constant");

class Articles {
  /*
  |----------------------------
  | Function to save article
  |----------------------------
  */
  saveBlogCategory(request, response, next) {
    articleRepository.saveBlogCategory(request).then((data) => {
        if (data === null || data.length === 0) {
          return response.json({
            code: FAILED_RETRIVE_CODE,
            message: ERROR_MSG,
            data: [],
          });
        }
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: data,
        });
    })
    .catch((error) => {
      next(new Error(`Articles : saveBlogCategory Method : ${error}`));
    });
  }
  /*
  |----------------------------
  | Function to retrive articles
  |----------------------------
  */
  getBlogCategoryByUser(request, response, next) {
    articleRepository.getBlogCategoryByUser(request).then((data) => {
        if (data === null || data.length === 0) {
          return response.json({
            code: FAILED_RETRIVE_CODE,
            message: ERROR_MSG,
            data: [],
          });
        }
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: data,
        });
      })
      .catch((error) => {
        next(new Error(`Articles : retriveArticles Method : ${error}`));
      });
  }
  /*
  |----------------------------
  | Function to retrive articles
  |----------------------------
  */
  getBlogCategory(request, response, next) {
    articleRepository.getBlogCategory(request).then((data) => {
        if (data === null || data.length === 0) {
          return response.json({
            code: FAILED_RETRIVE_CODE,
            message: ERROR_MSG,
            data: [],
          });
        }
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: data,
        });
      })
      .catch((error) => {
        next(new Error(`Articles : getBlogCategory Method : ${error}`));
      });
  }
  /*
  |----------------------------
  | Function to save Blog by Category id
  |----------------------------
  */
  saveBlogByCategoryId(request, response, next) {
    articleRepository.saveBlogByCategoryId(request).then((data) => {
        if (data === null || data.length === 0) {
          return response.json({
            code: FAILED_RETRIVE_CODE,
            message: ERROR_MSG,
            data: [],
          });
        }
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: data,
        });
    })
    .catch((error) => {
      next(new Error(`Articles : saveBlogByCategoryId Method : ${error}`));
    });
  }
  /*
  |----------------------------
  | Function to save Blog by Category id
  |----------------------------
  */
  getBlogByslug(request, response, next) {
    articleRepository.getBlogByslug(request).then((data) => {
        if (data === null || data.length === 0) {
          return response.json({
            code: FAILED_RETRIVE_CODE,
            message: ERROR_MSG,
            data: [],
          });
        }
        return response.json({
          code: SUCCESS,
          message: SUCCESS_MSG,
          data: data,
        });
    })
    .catch((error) => {
      next(new Error(`Articles : getBlogByslug Method : ${error}`));
    });
  }

}

module.exports = Articles;
