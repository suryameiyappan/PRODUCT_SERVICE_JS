'use strict';

const BlogCategory = require("./blog-category.model");

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ BlogCategory }) { 
      this.belongsTo(BlogCategory, { foreignKey: 'blog_category_id', as: 'blog_category' });
    }
    
    toJSON(){
      return { ...this.get(), id: undefined  }
    }

  }
  Blog.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    blog_category_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'blog_categories',
        field: 'id',
      },
    },
    blog: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'blogs',
    modelName: 'Blog'
  });
  return Blog;
};
