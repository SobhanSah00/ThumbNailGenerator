import dotenv from "dotenv"
import connectDB from "./Database/index.js"
import {app} from "./app.js"

dotenv.config({
    path: "./.env"
})

connectDB()
.then(() => {
    app.on("error",() => {
        console.log("Error Occured");
        throw error
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server running on port ${process.env.PORT}.🔥`);  
    })
})
.catch((error) => {
    console.log("MONGODB CONNECTION FAILED");
    console.log("ERROR",error)
    throw error
})