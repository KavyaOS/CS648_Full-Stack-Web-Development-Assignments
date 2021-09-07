/* eslint linebreak-style: ["error","windows"] */

const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

function validate(product) {
  const errors = [];
  if (product.category === null) errors.push('Category not selected');
  if (product.name === null) errors.push('Product name not entered');
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function list() {
  const db = getDb();
  const products = await db.collection('products').find({}).toArray();
  return products;
}

async function update(_, { id, changes }) {
  const db = getDb();
  if (changes.name || changes.category) {
    const product = await db.collection('products').findOne({ id });
    Object.assign(product, changes);
    validate(product);
  }
  await db.collection('products').updateOne({ id }, { $set: changes });
  const savedProduct = await db.collection('products').findOne({ id });
  return savedProduct;
}

async function remove(_, { id }) {
  const db = getDb();
  const product = await db.collection('products').findOne({ id });
  if (!product) return false;
  await db.collection('products').removeOne({ id });
  return true;
}

async function get(_, { id }) {
  const db = getDb();
  const product = await db.collection('products').findOne({ id });
  return product;
}

async function add(_, { product }) {
  const db = getDb();
  validate(product);
  const newProduct = { ...product };
  newProduct.id = await getNextSequence('products');
  const result = await db.collection('products').insertOne(newProduct);

  const savedProduct = await db.collection('products').findOne({ _id: result.insertedId });
  return savedProduct;
}

module.exports = {
  list, add, get, update, remove,
};
