// const mongoose= require("mongoose")
import mongoose from "mongoose"


const {Schema,model}=mongoose

const todoSchema= Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const TodoModel= model("CodeCoastTodos",todoSchema)

export default TodoModel