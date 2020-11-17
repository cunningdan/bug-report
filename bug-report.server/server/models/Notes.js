import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Note = new Schema(
  {
    content: { type: String, required: true },
    bugId: { type: ObjectId, ref: 'Bug', required: true },
    profile: { type: String, ref: 'Profile', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Note
