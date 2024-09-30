'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductRoutes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
    }

    toJSON(){
      return { ...this.get(), id: undefined, password: undefined  }
    }

  }
  
  ProductRoutes.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.TINYINT,
    }
  }, {
    sequelize,
    tableName: 'product_routes',
    modelName: 'ProductRoutes'
  });

  return ProductRoutes;
};
