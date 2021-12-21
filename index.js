import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import TodoModel from "./todoSchema/schema.js"
const app=express()

dotenv.config()
app.use(cors())

const port= process.env.PORT || 9000
const url=process.env.DB_URL
app.use(express.json())
//Connection method to Database
mongoose.connect(url,{
    useNewUrlParser: true ,
    useUnifiedTopology:true

}).then(()=>{
    /// If database is connected successfully
    console.log("Database connecteduccessfully................")
}).catch((error)=>{
    //if an erro occurs
    console.log(error)
})
//////////////////////

///home route
app.get("/",(req,res)=>{
    res.send("Welcome to AB TOdo API")
})
//Get all Todos route
app.get("/getAllTodos",async(req,res)=>{
    const todo= await TodoModel.find({});

    if(todo){
        
       return res.status(200).json({
            message:"Fetch all todos from database",
            data:todo
        })
    }else{
      return  res.status(400).json({
            message:"Failed to fetch todos from database"
        })
    }
})

///Create a new Todo into database
app.post("/createtodo",async(req,res)=>{
    const{title, description,isCompleted}=req.body
    const createTodo= await TodoModel.create({
        title,
        description,
        isCompleted
        
    })
    if(createTodo){
        return res.status(201).json({
            message:"Todo created successfully",
            data:createTodo
        })
    }else{
        return res.status(400).json({
            message:"Failed to create a new Todo"
        })
    }
})

app.patch("/updatetodo/:id",async(req,res)=>{

  const {id}=req.params;
  const {isCompleted}=req.body

  const updateTodo=await TodoModel.updateOne({isCompleted:isCompleted}).where({_id:id})



if(updateTodo){
    return res.status(200).json({
      message:"Todo updated successfully",
      data:updateTodo 
      
    })
}else{
    return res.status(400).json({
       message:"Failed to update todo" 
    })
}
  
})

// Delete Todo from Database
app.delete("/deleteTodo/:id",async(req,res)=>{
    const {id}=req.params;
    const deleteTodo= await TodoModel.findByIdAndDelete({_id:id})

    if(deleteTodo){
        return res.status(200).json({
            message:"Todo deleted successfully.....",
            data: deleteTodo 

        })

    }else{
        return res.status(400).json({
            message: "Failed to delete Todo"
        })
    }
})


app.listen(port,()=>{
    console.log(`Todo server running at ${port}`)
});
