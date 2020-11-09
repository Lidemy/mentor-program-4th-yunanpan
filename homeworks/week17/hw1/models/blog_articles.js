'use strict';
const {
  Model, TEXT, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog_articles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog_articles.belongsTo(models.Blog_user)
    }
  };
  Blog_articles.init({
    title: DataTypes.STRING,
    catagory: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    BlogUserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Blog_articles',
  });
  return Blog_articles;
};