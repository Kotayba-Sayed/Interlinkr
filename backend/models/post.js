module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  Post.associate = (models) => {
    Post.hasMany(models.comments, {
      onDelete: 'cascade',
    });
  }

  return Post;
}