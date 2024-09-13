const 
  model = require("../models"), 
  Sequelize = require('sequelize'),
  {BlogCategory, Blog, Users} = model;

async function saveBlogCategory(request) {
  try {
    return await BlogCategory.create({
      user_id: request.user.user_id,
      category: request.body.category,
      slug: request.body.slug
    });
  } catch (error) {
    throw new Error(`Article Repository saveBlogCategory Method : ${error}`);
  }
}

async function getBlogCategoryByUser(request) {
  try {
    return await Users.findOne({
      where: {
        id: request.user.user_id
      },
      include: 'blog_categories',
    });
  } catch (error) {
    throw new Error(`Article Repository getBlogCategoryByUser Method : ${error}`);
  }
}

async function getBlogCategory(request) {
  try {
    
    let fromToDate, searchValue;
    if (request.body.searchValue) {
      searchValue ={
        where: {
          [Sequelize.Op.or]: [
            { category: request.body.searchValue },
            { slug: request.body.searchValue }
          ]
        },
      };
    }

    if (request.body.FromDate && request.body.ToDate) {
        const startDate = new Date(request.body.FromDate);
        const endDate = new Date(request.body.ToDate);
          fromToDate = {
            where: {
              createdAt: {
                [Sequelize.Op.between]: [startDate, endDate],
              }
            }, 
          };
    }

    const query = {
      ...fromToDate,
      ...searchValue,
      order: [['id', 'DESC']],
      skip: request.body.skip,
      limit: request.body.limit
    };
    const { count, rows } = await BlogCategory.findAndCountAll(query);

    return {
      totalLength: count,
      dataList: rows,
    };
  } catch (error) {
    throw new Error(`Article Repository getBlogCategory Method : ${error}`);
  }
}

async function saveBlogByCategoryId(request) {
  try {
    const category = await BlogCategory.findAll({
      where: {
        [Sequelize.Op.and]: [
          { category: request.body.category },
          { slug: request.body.slug }
        ]
      }
    });
    if (category.length > 0) {
      return await Blog.create({
        blog_category_id: category[0].id,
        blog: request.body.blog
      });
    }
    return [];
  } catch (error) {
    throw new Error(`Article Repository saveBlogCategory Method : ${error}`);
  }
}

async function getBlogByslug(request) {
  try {
    const category = await BlogCategory.findOne({
      where: {
         slug: request.body.slug
      },
      include: 'blog',
    });
    return category;
  } catch (error) {
    throw new Error(`Article Repository getBlogByslug Method : ${error}`);
  }
}

module.exports = {
  getBlogCategory: getBlogCategory,
  getBlogCategoryByUser: getBlogCategoryByUser,
  saveBlogCategory: saveBlogCategory,
  saveBlogByCategoryId: saveBlogByCategoryId,
  getBlogByslug: getBlogByslug
};
