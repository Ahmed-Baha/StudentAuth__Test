const mongoose=require('mongoose')



const connectDB= async()=>{
    try{
await mongoose.connect('mongodb://127.0.0.1:27017/Auth_test')
console.log('datbase connected');
   

}catch(err){console.log(err);
        return 0
    }
}
module.exports=connectDB
