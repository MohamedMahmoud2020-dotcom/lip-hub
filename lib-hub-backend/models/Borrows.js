import mongoose, { Mongoose } from "mongoose"


const borrowsSchema = mongoose.Schema({
    book:{
        type:String,
        required : true
    },
    member:{
        type:String,
        required:true
    },
    borrowedDate:{
        type:Date,
        required:true
    },
    dueDate:{
        type:Date,
        required:true
    },
    returnDate:{
        type:Date,
    },
    status:{
        type:String,
    },
    fine:{
        type:Number
    },
}, {timeStamps:true});


const Borrows = mongoose.model("Borrows", borrowsSchema);

export default Borrows;