import mongoose from "mongoose";

const memberSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    fines:{
        type:Number,
    },
    books:{
        type:Number
    },
    memberShipStatus:{
        type:String
    },
    joinDate:{
        type:Date,
        required:true
    }
}, {timeStamps:true})

const Member = mongoose.model("Member", memberSchema)

export default Member;