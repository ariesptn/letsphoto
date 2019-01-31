'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    comment: DataTypes.STRING
  }, {});
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsToMany(models.Image, { through: models.ImageComment })
    Comment.hasMany(models.CommentReply)
  };
  Comment.prototype.getReply = function () {
    return Comment.findAll({
      where: { CommentId: this.id }
    })
  }
  return Comment;
};