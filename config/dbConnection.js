const mongoose=require('mongoose');
const connectDb= async() => {
    try{
        const connect =await mongoose.connect(process.env.Connection_String)
        console.log(`MongoDB Connected: ${connect.connection.host}`);
        console.log(`MongoDB Connected: ${connect.connection.name}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}
module.exports=connectDb