import { useState } from "react";

function TaskForm({ onAddTask }) {

    const [title, setTitle] = useState("");

    const [subject, setSubject] = useState("");

    const [deadline, setDeadline] = useState("");

    const [priority, setPriority] = useState("High");

    async function handleSubmit(e) {

        e.preventDefault();

        const taskData = {
    title: title.trim(),
    subject: subject.trim(),
    deadline,
    priority
};

if (
    !taskData.title ||
    !taskData.subject
) {
    return;
}

        await onAddTask(taskData);

        setTitle("");
        setSubject("");
        setDeadline("");
        setPriority("High");
    }

    return (

        <form
            className="task-form"
            onSubmit={handleSubmit}
        >

            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                required
            />

            <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) =>
                    setSubject(e.target.value)
                }
                required
            />

            <input
                type="date"
                value={deadline}
                onChange={(e) =>
                    setDeadline(e.target.value)
                }
                required
            />

            <select
                value={priority}
                onChange={(e) =>
                    setPriority(e.target.value)
                }
            >

                <option value="High">
                    High
                </option>

                <option value="Medium">
                    Medium
                </option>

                <option value="Low">
                    Low
                </option>

            </select>

            <button type="submit">

                Add Task ⚡

            </button>

        </form>

    );
}

export default TaskForm;