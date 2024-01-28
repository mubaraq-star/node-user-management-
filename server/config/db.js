const mongoose = require("mongoose");
// mongoose.set('strictQuery', false);
const connectDB = async () => {
    try{
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`DataBase connected: ${conn.connection.host}`)
    }
    catch(err){
console.log(err);
    }
}

module.exports = connectDB; 