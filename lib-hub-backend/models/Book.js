import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author:{
    type: String,
    required: true,
  },
    isbn:{
    type: String,
    required: true,
    unique: true,
  },
    category:{
    type: String,
    default: "General",
  },
    totalCopies:{
    type: Number,
    required: true,
  },
    availableCopies:{
    type: Number,
    default: function() {
      return this.totalCopies;
    },
  },
  description:{
    type:String
  },
    publishedYear:{
    type: Number,
  },
    pages:{
    type: Number,
    required: true,
  },
    rating:{
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  coverImgUrl:{
    type: String,
    default: "",
  },
}, {timestamps:true});

const Book = mongoose.model("Book", bookSchema);

export default Book;