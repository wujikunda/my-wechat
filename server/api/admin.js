import mongoose from 'mongoose'

const User = mongoose.model('User')

export async function login(email, password) {
  let match = null
  let user = null
  try {
    user = await User.findOne({email: email}).exec()
    if (user) {
      match = await user.comparePassword(password, user.password)
    }
  } catch (e) {
    throw new Error(e)
  }
  return {
    user,
    match
  }
}