/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */


module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'posts_categories',
      underscored: true,
    }
  );

  PostCategory.associate = ({ BlogPost, Category }) => {
    Category.belongsToMany(BlogPost, {
      foreignKey: 'category_id',
      otherKey: 'post_id',
      through: PostCategory,
      as: 'blog_post',
    });
    BlogPost.belongsToMany(Category, {
      foreignKey: 'post_id',
      otherKey: 'category_id',
      through: PostCategory,
      as: 'category',
    });
  };

  return PostCategory;
};
