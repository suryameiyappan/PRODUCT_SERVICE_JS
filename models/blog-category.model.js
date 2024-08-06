
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BlogCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, Blog }) {
      this.belongsTo(Users, { foreignKey: 'user_id', as: 'users' });
      this.hasOne(Blog, { foreignKey: 'blog_category_id', as: 'blog' });
    }

    toJSON(){
      return { ...this.get(), id: undefined  }
    }
  }
  
  BlogCategory.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users',
        field: 'id',
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'blog_categories',
    modelName: 'BlogCategory'
  });
  return BlogCategory;
};
