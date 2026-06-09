import { useEffect, useState } from "react";

function ClockWidget() {

    const [time, setTime] =
        useState("");

    const [date, setDate] =
        useState("");

    useEffect(() => {

        function updateClock() {

            const now =
                new Date();

            const currentTime =
                now.toLocaleTimeString(
                    [],
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    }
                );

            const currentDate =
                now.toLocaleDateString(
                    [],
                    {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }
                );

            setTime(currentTime);

            setDate(currentDate);
        }

        updateClock();

        const interval =
            setInterval(
                updateClock,
                1000
            );

        return () => {

            clearInterval(
                interval
            );

        };

    }, []);

    return (

        <div className="info-card">

            <h2>
                ⏰ Current Time
            </h2>

            <p id="timeText">

                {time}

            </p>

            <p id="dateText">

                {date}

            </p>

        </div>

    );
}

export default ClockWidget;