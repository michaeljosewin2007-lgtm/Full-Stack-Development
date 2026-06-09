import { useEffect, useState } from "react";

function Toggle() {

    const [focusMode, setFocusMode] =
        useState(false);

    useEffect(() => {

        const savedMode =
            localStorage.getItem(
                "studyflowMode"
            );

        if (savedMode === "focus") {

            setFocusMode(true);

        }

    }, []);

    useEffect(() => {

        if (focusMode) {

            localStorage.setItem(
                "studyflowMode",
                "focus"
            );

            document.body.style.background =
                "linear-gradient(-45deg, #111827, #1e1b4b, #312e81, #111827)";

            document.body.style.backgroundSize =
                "400% 400%";

            document.body.style.animation =
                "gradientMove 10s ease infinite";

        }
        else {

            localStorage.setItem(
                "studyflowMode",
                "chill"
            );

            document.body.style.background =
                "linear-gradient(-45deg, #0f172a, #164e63, #0f766e, #0f172a)";

            document.body.style.backgroundSize =
                "400% 400%";

            document.body.style.animation =
                "gradientMove 10s ease infinite";

        }

    }, [focusMode]);

    function handleToggle() {

        setFocusMode(
            previous => !previous
        );

    }

    return (

        <div className="theme-toggle-container">

            <span>
                😌 Chill
            </span>

            <label className="switch">

                <input
                    type="checkbox"
                    checked={focusMode}
                    onChange={handleToggle}
                />

                <span className="slider"></span>

            </label>

            <span>
                🎯 Focus
            </span>

        </div>

    );
}

export default Toggle;