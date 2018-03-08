const mongoose = require('mongoose')
const { Schema } = mongoose
const Mixed = Schema.Types.Mixed

const HouseSchema = new Schema({
  name: String,
  cname: String,
  words: String,
  intro: String,
  cover: String,
  wikiId: Number,
  sections: Mixed,
  swornMembers: [
    {
      character: { type: String, ref: 'WikiCharacter' },
      text: String
    }
  ],
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    }
  }
})

mongoose.model('WikiHouse', HouseSchema)
