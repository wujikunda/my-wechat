const mongoose = require('mongoose')
const { Schema } = mongoose
const Mixed = Schema.Types.Mixed

const WikiCharacterSchema = new Schema({
  _id: String,
  wikiId: Number,
  nmId: String,
  chId: String,
  name: String,
  cname: String,
  playedBy: String,
  profile: String,
  allegiances: [
    String
  ],
  images: [
    String
  ],
  sections: Mixed,
  intro: [
    String
  ]
})

mongoose.model('WikiCharacter', WikiCharacterSchema)
