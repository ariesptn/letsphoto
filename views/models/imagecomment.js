'use strict';
module.exports = (sequelize, DataTypes) => {
  const ImageComment = sequelize.define('ImageComment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ImageId: DataTypes.INTEGER,
    CommentId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  ImageComment.associate = function (models) {
    // associations can be defined here
    ImageComment.belongsTo(models.Image)
    ImageComment.belongsTo(models.Comment)
    ImageComment.belongsTo(models.User)
  };
  return ImageComment;
};