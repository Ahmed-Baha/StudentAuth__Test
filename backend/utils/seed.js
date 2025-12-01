const connectDB=require('../db')
const Class=require('../model/Class')
const Student=require('../model/Student')

const seed=async()=>{
    await connectDB()
    await Class.deleteMany({})
    await Student.deleteMany({})

     const classes = await Class.insertMany([
    { title: "Math 101", room: "A1" },
    { title: "Science 202", room: "B2" },
    { title: "geometry 102", room: "C1" },
  ])

  const students = [
    { name: "Ali", age: 20, classId: classes[0]._id ,author:"6927b2ba8e26078708a29ec3"},
    { name: "Sara", age: 19, classId: classes[1]._id ,author:"6927b2ba8e26078708a29ec3"},
    { name: "John", age: 21, classId: classes[2]._id ,author:"6927b2ba8e26078708a29ec3"},
  ]
  await Student.insertMany(students)
  console.log('seed complete')
   
}
seed()