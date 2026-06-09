import { useMemo } from "react";

function SuggestionWidget({ tasks }) {

    const suggestion = useMemo(() => {

        if (!tasks.length) {

            return "Add a task to get smart suggestions.";
        }

        let bestTask = null;

        let bestScore = -9999;

        tasks.forEach((task) => {

            const deadline =
                new Date(task.deadline);

            const today =
                new Date();

            const daysLeft =
                Math.ceil(
                    (deadline - today) /
                    (1000 * 60 * 60 * 24)
                );

            let priorityScore = 1;

            if (task.priority === "High") {

                priorityScore = 3;

            } else if (
                task.priority === "Medium"
            ) {

                priorityScore = 2;
            }

            const urgencyScore =
                priorityScore * 10 - daysLeft;

            if (
                urgencyScore > bestScore
            ) {

                bestScore =
                    urgencyScore;

                bestTask =
                    task;
            }

        });

        if (!bestTask) {

            return "No task available.";
        }

        const daysLeft =
    Math.ceil(
        (
            new Date(bestTask.deadline)
            -
            new Date()
        )
        /
        (1000 * 60 * 60 * 24)
    );

if (daysLeft < 0) {

    return `⚠ "${bestTask.title}" is overdue!`;
}

if (daysLeft === 0) {

    return `🔥 "${bestTask.title}" is due today!`;
}

if (daysLeft <= 2) {

    return `⚡ Focus on "${bestTask.title}" — due very soon!`;
}

return `📚 Work on "${bestTask.title}" next.`;

    }, [tasks]);

    return (

        <div className="info-card">

            <h2>
                ⚡ Suggestions
            </h2>

            <p className="suggestion-text">

                {suggestion}

            </p>

        </div>

    );
}

export default SuggestionWidget;