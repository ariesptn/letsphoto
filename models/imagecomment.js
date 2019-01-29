'use strict';
module.exports = (sequelize, DataTypes) => {
  const ImageComment = sequelize.define('ImageComment', {
    ImageId: DataTypes.INTEGER,
    CommentId: DataTypes.INTEGER
  }, {});
  ImageComment.associate = function(models) {
    // associations can be defined here
  };
  return ImageComment;
};