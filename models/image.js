'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    filename: DataTypes.STRING,
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    views: DataTypes.INTEGER
  }, {});
  Image.associate = function (models) {
    // associations can be defined here
    Image.belongsToMany(models.Comment, { through: models.ImageComment })
    Image.belongsTo(models.User)
  };
  return Image;
};