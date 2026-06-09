function StatisticsCard({ tasks = [] }) {

    const overdueCount =
        tasks.filter(task => {

            const deadline =
                new Date(task.deadline);

            return deadline < new Date();

        }).length;

    return (

        <div className="info-card">

            <h2>
                📊 Statistics
            </h2>

            <p>
                Total Tasks: {tasks.length}
            </p>

            <p>
                Overdue: {overdueCount}
            </p>

        </div>

    );
}

export default StatisticsCard;