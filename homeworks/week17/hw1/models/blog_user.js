'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog_user.hasMany(models.Blog_articles)
    }
  };
  Blog_user.init({
    username: DataTypes.STRING,
    passhash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Blog_user',
  });
  return Blog_user;
};