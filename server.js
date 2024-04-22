const port=process.env.PORT || 3000
const express=require('express');
const app=express();
const dotenv=require('dotenv').config()
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorhandler");
const connectDb=require('./config/dbConnection')
const useRouter=require('./routes/userRoute')

connectDb();
app.use(express.json())
app.use('/api/contacts',contactRoutes)
app.use(errorHandler)
app.use('/api/user',useRouter)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})