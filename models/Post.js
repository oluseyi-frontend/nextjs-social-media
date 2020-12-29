import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    comments: [
      {
        body: String,
        username: String,
        likes: [
          {
            username: String
          }
        ]
      },
      { timestamps: true },
    ],
    likes: [
      {
        username: String,
      },
      { timestamps: true },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema)