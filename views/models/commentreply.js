'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentReply = sequelize.define('CommentReply', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    comment: DataTypes.STRING,
    CommentId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  CommentReply.associate = function (models) {
    // associations can be defined here
    CommentReply.belongsTo(models.User)
    CommentReply.belongsTo(models.Comment)
  };
  return CommentReply;
};