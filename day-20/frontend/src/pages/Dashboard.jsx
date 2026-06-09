import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import TaskForm from "../components/TaskForm";
import WeatherWidget from "../components/WeatherWidget";
import ClockWidget from "../components/ClockWidget";
import QuoteWidget from "../components/QuoteWidget";
import SuggestionWidget from "../components/SuggestionWidget";
import StatisticsCard from "../components/StatisticsCard";
import Toggle from "../components/Toggle";
import TaskList from "../components/TaskList";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    useEffect(() => {

        checkAuth();

        loadTasks();

    }, []);

    async function checkAuth() {

        try {

            const response =
                await axios.get(
                    "http://localhost:3000/checkAuth",
                    {
                        withCredentials: true
                    }
                );

            if (!response.data.loggedIn) {

                window.location.href = "/";

                return;
            }

            setUser({
                id: response.data.userId,
                name: response.data.userName
            });

        }
        catch (error) {

            console.log(error);
        }
    }

    async function loadTasks() {

        try {

            const response =
                await axios.get(
                    "http://localhost:3000/tasks",
                    {
                        withCredentials: true
                    }
                );

            setTasks(response.data);

        }
        catch (error) {

            console.log(error);
        }
        finally {

            setLoading(false);
        }
    }

    async function addTask(taskData) {

        try {

            await axios.post(
                "http://localhost:3000/addTask",
                taskData,
                {
                    withCredentials: true
                }
            );

            loadTasks();

        }
        catch (error) {

            console.log(error);
        }
    }

    async function deleteTask(taskId) {

        try {

            await axios.delete(
                `http://localhost:3000/tasks/${taskId}`,
                {
                    withCredentials: true
                }
            );

            setTasks(
                tasks.filter(
                    task => task.id !== taskId
                )
            );

        }
        catch (error) {

            console.log(error);
        }
    }

    async function importTeacherTasks() {

        try {

            const response =
                await axios.get(
                    "http://localhost:4000/teacherTasks"
                );

            const teacherTasks =
                response.data;

            for (const task of teacherTasks) {

                await axios.post(
                    "http://localhost:3000/importTeacherTasks",
                    {
                        teacherId: task.id,
                        title: task.title,
                        subject: task.subject,
                        deadline: task.deadline,
                        priority: task.priority
                    },
                    {
                        withCredentials: true
                    }
                );
            }

            loadTasks();

        }
        catch (error) {

            console.log(error);
        }
    }

    if (loading) {

        return (
            <h2>
                Loading Dashboard...
            </h2>
        );
    }

    return (

        <div className="container">

            <Sidebar>

                <WeatherWidget />

            </Sidebar>

            <div className="main-content">

                <div className="top-section">

                    <h2>
                        Add Study Task
                    </h2>

                    <TaskForm
                        onAddTask={addTask}
                    />

                    <button
                        className="teacher-btn"
                        onClick={importTeacherTasks}
                    >
                        Teacher Tasks 📥
                    </button>

                </div>

                <div className="dashboard-header">

                    <ClockWidget />

                    <QuoteWidget />

                    <SuggestionWidget
                        tasks={tasks}
                    />

                    <StatisticsCard
                        totalTasks={tasks.length}
                    />

                </div>

                <Toggle />

                <TaskList
                    tasks={tasks}
                    onDelete={deleteTask}
                />

            </div>

        </div>

    );
}

export default Dashboard;