import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Bug = new Schema(
  {
   closed: { type: Boolean, required: true },
   description: { type: String, required: true },
   title: { type: String, required: true },
   closedDate: { type: Date },
   profile: { type: String, ref: 'Profile', required: true}
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Bug
