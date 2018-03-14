const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema({
  price: String,
  title: String,
  intro: String,
  parameters: [
    { key: String, value: String }
  ],
  images: [
    String
  ]
})

mongoose.model('Product', ProductSchema)
