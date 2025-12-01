const mongoose =require('mongoose')

const classSchema=new mongoose.Schema({
    title:String,
    room:String,
})

//to make populate work the other way 
classSchema.virtual("students", {
  ref: "Student",
  localField: "_id",
  foreignField: "classId"
})

classSchema.set("toJSON", { virtuals: true })
module.exports=mongoose.model('Class',classSchema)