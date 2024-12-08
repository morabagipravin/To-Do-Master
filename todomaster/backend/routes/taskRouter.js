const express=require('express');

const taskRouter=express.Router();

const Task=require('../models/task');

taskRouter.get('/getAllTasks',async(req,res)=>{
    try{
        const email=req.query.email;
        const tasks=await Task.find({user_id:email});

        res.status(200).json({tasks});
    }catch(error){
        res.status(500).json({error});
    }
}
);

//add task

taskRouter.post('/addTask',async(req,res)=>{
    try{
        console.log(req.body);
        const task=await Task.create(req.body);
        res.status(200).json({task});
    }catch(error){
        res.status(500).json({error});
    }
}
);

//delete task

taskRouter.delete('/deleteTask',async(req,res)=>{
    const taskId=req.query.taskId;
    try{
        console.log("delete called");
        console.log(taskId);
        const task=await Task.findByIdAndDelete(taskId);
        console.log(task);
        res.status(200).json({task});
    }catch(error){
        res.status(500).json({error});
    }
}
);

//update task

taskRouter.put('/updateTask',async(req,res)=>{
    console.log(req.body);
    const taskId=req.body._id;
    const updatedTask=req.body;

    try{

        const result = await Task.findOneAndUpdate(
            { _id: taskId },
            { $set: updatedTask },
            { new: true } 
        );
        res.status(200).json({result});
    }
    catch(error){
        res.status(500).json({error});
    }
}
);

//change the status to completed

taskRouter.put('/completeTask',async(req,res)=>{
    const taskId=req.query.taskId;
    try{
        const task=await Task.findById(taskId);
        if(task.status==='completed'){
            task.status='pending';
        }
        else{
            task.status='completed';
        }
        const result=await task.save();
        res.status(200).json({result});
    }
    catch(error){
        res.status(500).json({error});
    }
}
);

module.exports=taskRouter;