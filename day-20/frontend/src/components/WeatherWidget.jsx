import { useEffect, useState } from "react";

function WeatherWidget() {

    const [weather, setWeather] =
        useState("Loading...");

    useEffect(() => {

        loadWeather();

    }, []);

    function getWeatherCondition(code) {

        const conditions = {

            0: "☀️ Clear Sky",

            1: "🌤 Mainly Clear",

            2: "⛅ Partly Cloudy",

            3: "☁️ Cloudy",

            45: "🌫 Foggy",

            48: "🌫 Dense Fog",

            51: "🌦 Light Drizzle",

            61: "🌧 Rain",

            71: "❄️ Snow",

            95: "⛈ Thunderstorm"
        };

        return (
            conditions[code] ||
            "🌍 Unknown"
        );
    }

    async function loadWeather() {

        if (!navigator.geolocation) {

            setWeather(
                "Location unavailable"
            );

            return;
        }

        navigator.geolocation.getCurrentPosition(

            async (position) => {

                try {

                    const lat =
                        position.coords.latitude;

                    const lon =
                        position.coords.longitude;

                    const response =
                        await fetch(

`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`

                        );

                    const data =
                        await response.json();

                    const condition =
                        getWeatherCondition(
                            data.current.weather_code
                        );

                    setWeather(

                        `${condition}
                        
🌡 ${data.current.temperature_2m}°C`

                    );

                }
                catch (error) {

                    setWeather(
                        "Unable to fetch weather"
                    );
                }

            },

            () => {

                setWeather(
                    "Location access denied"
                );

            }

        );

    }

    return (

        <div className="weather-card">

            <h3
                style={{
                    whiteSpace: "pre-line"
                }}
            >

                {weather}

            </h3>

        </div>

    );

}

export default WeatherWidget;