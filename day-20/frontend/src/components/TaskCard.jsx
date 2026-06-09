function TaskCard({ task, onDelete }) {

    const today = new Date();

    const deadlineDate =
        new Date(task.deadline);

    const daysLeft =
        Math.ceil(
            (deadlineDate - today) /
            (1000 * 60 * 60 * 24)
        );

    const isOverdue =
        daysLeft < 0;

    let cardClass = "task-card";

    if (task.priority === "High") {

        cardClass +=
            " high-priority-card";
    }
    else if (
        task.priority === "Medium"
    ) {

        cardClass +=
            " medium-priority-card";
    }
    else {

        cardClass +=
            " low-priority-card";
    }

    return (

        <div className={cardClass}>

            <h3>
                {task.title}
            </h3>

            <div className="task-info">

                <span>
                    📚 {task.subject}
                </span>

                <span className="deadline">

                    📅{" "}

                    {
                        deadlineDate
                        .toLocaleDateString()
                    }

                </span>

                <div
                    className={
                        `priority-badge ${task.priority.toLowerCase()}`
                    }
                >

                    {task.priority}

                </div>

                {isOverdue && (

                    <div
                        className="overdue-badge"
                    >

                        OVERDUE

                    </div>

                )}

            </div>

            <button
                className="complete-btn"
                onClick={() =>
                    onDelete(task.id)
                }
            >

                Completed ✅

            </button>

        </div>

    );
}

export default TaskCard;