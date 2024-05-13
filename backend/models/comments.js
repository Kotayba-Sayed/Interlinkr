module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    theComment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return comments;
}