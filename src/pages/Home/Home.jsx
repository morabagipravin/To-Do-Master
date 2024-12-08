//create a task tracker home page in which all my home pages will be listed with their title description and status being shown, with an option to edit and delete

import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./Home.css";
import { useLocation } from "react-router-dom";



function Home() {
    const [tasks, setTasks] = useState([]);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: ""
    });

    const location = useLocation();
    const email = location.state && location.state.email;

    const [showTaskDialog, setShowTaskDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editTask, setEditTask] = useState({
        _id: "",
        title: "",
        description: "",
        dueDate: ""
    });
    
    const handleAddDialog = () => {
        setShowAddDialog(true);
    };

    const handleCloseDialog = () => {
        setShowAddDialog(false);
        setNewTask({
            title: "",
            description: "",
            dueDate: ""
        });
    };

    const handleEditDialog = (task) => {
        setEditTask({
            _id: task._id,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate
        });
        setShowEditDialog(true);
    };

    const handleEditCloseDialog = () => {
        setShowEditDialog(false);
        setEditTask({
            title: "",
            description: "",
            dueDate: ""
        });
    };

    const getTasks = async () => {
        const response = await fetch(`http://65.2.189.213:8000/api/task/getAllTasks?email=${email}`);
        const data = await response.json();
        return data["tasks"];
    }

    
    useEffect(() => {
        const fetchTasks = async () => {
        const tasks = await getTasks();
        setTasks(tasks);
        };
        fetchTasks();
    }, []);
    
    const handleDelete = async (id) => {
        console.log(id);
        await deleteTask(id);
        const tasks = await getTasks();
        
        setTasks(tasks);
    };

    const deleteTask = async (id) => {
        await fetch(`http://65.2.189.213:8000/api/task/deleteTask?taskId=${id}`, {
        method: "DELETE",
        });
    };

    
    const handleAddTask = async () => {
        const newMap={user_id:email,...newTask};
        console.log(newMap);
        
        const response = await fetch("http://65.2.189.213:8000/api/task/addTask", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(newMap),
        });

        setShowAddDialog(false);
        setNewTask({
            title: "",
            description: "",
            dueDate: ""
        });
        const tasks = await getTasks();
        setTasks(tasks);
    }

    const handleEditTask = async () => {
        
        const response = await fetch("http://65.2.189.213:8000/api/task/updateTask", {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(editTask),
        });

        setShowEditDialog(false);
        setEditTask({
            title: "",
            description: "",
            dueDate: ""
        });
        const tasks = await getTasks();
        setTasks(tasks);
    }

    const handleCompleteTask=async(id)=>{
        const response = await fetch(`http://65.2.189.213:8000/api/task/completeTask?taskId=${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            });
        
            const tasks = await getTasks();
            setTasks(tasks);
    }

    const handleTaskClick = (task) => {
        setShowTaskDialog(true);
        setSelectedTask(task);
    };

    
    return (
        <div className="home-container">
        <h1>Task Tracker</h1>
        <p className="center-title">
        Welcome, {email}!{" "}
        <Link to="/" className="logout-link">
          Logout
        </Link>
      </p>
        <table className="table">
            <thead>
            <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map((task) => (
                <tr key={task.id}>
                <td><button
                                    className="button-title"
                                    onClick={() => handleTaskClick(task)}
                                >
                                    {task.title}
                                </button></td>
                <td>{task.status}</td>
                <td>
                    <button className=" muted-button" onClick={()=>handleEditDialog(task)}>Edit</button>
                    <button
                    className="muted-button"
                    onClick={() => handleDelete(task._id)}
                    >
                    Delete
                    </button>
                    <button
                    className="muted-button"
                    onClick={() => handleCompleteTask(task._id)}
                    >
                    Change Status
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        {showTaskDialog && selectedTask && (
            <div className="background-blur">
                <div className="dialog">
                    <h2>{selectedTask.title}</h2>
                    <p><strong>Description:</strong> {selectedTask.description}</p>
                    <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
                    <p><strong>Status:</strong> {selectedTask.status}</p>
                    <button className="button-dialog" onClick={() => setShowTaskDialog(false)} >Close</button>
                </div>
            </div>
            )}



            <button className="task-button" onClick={handleAddDialog}>Add New Task</button>
            {showAddDialog && (
                 <div className="background-blur">
                <div className="dialog">
                    <h2>Add New Task</h2>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                    <label>Description:</label>
                    <input
                        type="text"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    />
                    <label>Due Date:</label>
                    <input
                        type="text"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                    <button onClick={handleAddTask} className="button-dialog">Add Task</button>
                    <button onClick={handleCloseDialog} className="button-dialog">Cancel</button>
                </div>
                </div>
            )}


{showEditDialog && (
     <div className="background-blur">
                <div className="dialog">
                    <h2>Add New Task</h2>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={editTask.title}
                        onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                    />
                    <label>Description:</label>
                    <input
                        type="text"
                        value={editTask.description}
                        onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                    />
                    <label>Due Date:</label>
                    <input
                        type="text"
                        value={editTask.dueDate}
                        onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
                    />
                    <button onClick={handleEditTask} className="button-dialog">Update</button>
                    <button onClick={handleEditCloseDialog} className="button-dialog">Cancel</button>
                </div>
                </div>
            )}
        </div>
        
    );
    }


export default Home;