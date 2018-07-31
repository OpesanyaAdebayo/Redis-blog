import mongoose from "mongoose";
export type postType = mongoose.Document & {
    title?: string,
    votes?: number,
    poster?: string,
    postedAt?: number
};

export type postList = {
    title: string,
    id: string
}
export const postSchema = new mongoose.Schema({
    title: String,
    votes: Number,
    poster: String,
    postedAt: Date,
});

const Post = mongoose.model("Post", postSchema);

postSchema.pre("save", function save(this:postType, next) {
    this.postedAt = Date.now();
    this.votes = 0;
    next();
})

export default Post;