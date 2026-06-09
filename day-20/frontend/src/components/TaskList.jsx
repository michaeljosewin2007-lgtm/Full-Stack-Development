import TaskCard from "./TaskCard";

function TaskList({
    tasks,
    onDelete
}) {

    return (

        <div className="tasks-container">

            <h2 className="tasks-heading">

                📋 Your Tasks

            </h2>

            <div className="tasks-section">

                {
                    tasks.length === 0
                    ?
                    (
                        <div className="empty-tasks">

                            <h3>
                                No Tasks Yet 📚
                            </h3>

                            <p>
                                Add your first study task above.
                            </p>

                        </div>
                    )
                    :
                    (
                        tasks.map((task) => (

                            <TaskCard
                                key={task.id}
                                task={task}
                                onDelete={onDelete}
                            />

                        ))
                    )
                }

            </div>

            <div className="task-summary">

                <span>

                    Total Tasks:
                    {" "}
                    {tasks.length}

                </span>

                <span>

                    Active Tasks:
                    {" "}
                    {tasks.length}

                </span>

            </div>

        </div>

    );
}

export default TaskList;