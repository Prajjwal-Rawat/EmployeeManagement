const express = require("express");
const app = express();

require("dotenv").config();
const Port = process.env.PORT || 4000;

const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const {connectCloudinary} = require("./config/Cloudinary");
const {DbConnection} = require("./config/DbConnection");
const routes = require("./Routes/Route");
const cors = require("cors");

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp/"
}));
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use("/api/v1", routes);

DbConnection();
connectCloudinary();


app.get("/", (req,res) => {
    return res.json({
        success:true,
        message:"Your server is up and running.."
    })
});

app.listen(Port, () => {
    console.log(`Server is running at ${Port}`);
})