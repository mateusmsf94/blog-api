const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const { BlogPost, Category, User } = require('../models');

const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const create = async ({ title, content, categoryIds }, userId) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const postCreated = await BlogPost.create(
      { title, content, userId, updated: Date.now(), published: Date.now() },
      { transaction },
    );
    const categories = await Category.findAll({
      where: { id: { [Op.in]: categoryIds } },
      transaction,
    });
    await postCreated.setCategories(categories, { transaction });
    await transaction.commit();
    return { type: null, message: { ...postCreated.toJSON(), categories } };
  } catch (error) {
    if (transaction) await transaction.rollback();
    return error;
  }
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

module.exports = { create, getAllPosts, getPostById };