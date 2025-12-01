const mongoose=require('mongoose')

const studentSchema=new mongoose.Schema({
    name:{type:String,required:true}
    ,
    age:Number,
    classId:{type:mongoose.Schema.Types.ObjectId,
        ref:"Class",
        required:true
    },
    author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  }
})
module.exports=mongoose.model('Student',studentSchema)