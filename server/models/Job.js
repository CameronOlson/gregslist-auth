import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const JobSchema = new Schema(
  {
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    rate: { type: Number, required: true },
    hours: { type: Number, required: true },
    description: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
