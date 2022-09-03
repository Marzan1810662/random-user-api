const express = require('express');
const usersRoutes = require("./routes/users.route");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/user",usersRoutes)

//root api 
app.get('/',(req,res) =>{
    res.send("Hello from random user api");
});

app.all("*",(req,res) =>{
    res.send("No route found");
});

app.listen(port,()=>{
    console.log("random user api server running at", port);
});