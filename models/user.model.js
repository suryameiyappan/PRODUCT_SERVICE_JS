'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
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
  
  Users.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    verify_token: {
      type: DataTypes.STRING,
    },
    is_verified: {
      type: DataTypes.TINYINT,
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'Users'
  });

  return Users;
};
