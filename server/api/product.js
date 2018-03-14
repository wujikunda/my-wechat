import mongoose from 'mongoose'

const Product = mongoose.model('Product')

export async function getProduct(_id) {
  let character = await Product.findById(_id).exec()
  return character
}

export async function putProduct(_id, body) {
  let character = await Product.findById(_id).exec()

  character.sections = body.sections
  character.profile = body.profile
  character.name = body.name
  character.cname = body.cname
  character.playedBy = body.playedBy
  character.images = body.images

  character = await character.save()

  return character
}

export async function getProducts(limit) {
  let characters = await Product
    .find({})
    .limit(Number(limit))
    .exec()

  return characters
}

export async function save(product) {
  product = new Product(product)
  product = await product.save()
  return product
}

export async function update(product) {
  product = await product.save()
  return product
}

export async function del(product) {
  await product.remove()
  return true
}
