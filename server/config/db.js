const mongoose=require('mongoose')
const connectDB=async()=>{
    try{
        const con=await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to db, host: ${con.connection.host}`)
    }
    catch(err){
        console.log(err)
    }
}
module.exports=connectDB