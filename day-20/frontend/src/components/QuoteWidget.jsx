import { useEffect, useState } from "react";

function QuoteWidget() {

    const [quote, setQuote] =
        useState("Loading quote...");

    useEffect(() => {

        loadQuote();

    }, []);

    async function loadQuote() {

        try {

            const response =
                await fetch(
                    "https://zenquotes.io/api/today"
                );

            const data =
                await response.json();

            setQuote(
                `"${data[0].q}" — ${data[0].a}`
            );

        }
        catch (error) {

            const fallbackQuotes = [

    "Small progress is still progress.",

    "Discipline beats motivation.",

    "Focus on consistency.",

    "Keep showing up every day.",

    "Success is built one study session at a time.",

    "Your future self will thank you.",

    "Done is better than perfect.",

    "Stay focused. Stay consistent."

];

            const randomQuote =

                fallbackQuotes[
                    Math.floor(
                        Math.random()
                        *
                        fallbackQuotes.length
                    )
                ];

            setQuote(randomQuote);
        }
    }

    return (

        <div className="info-card">

            <h2>
                💬 Daily Motivation
            </h2>

            <p className="quote-text">

                {quote}

            </p>

        </div>

    );
}

export default QuoteWidget;