import axios from "axios";

function Sidebar({ children }) {

    async function handleLogout() {

        try {

            await axios.get(
                "http://localhost:3000/logout",
                {
                    withCredentials: true
                }
            );

            window.location.href = "/";

        }
        catch (error) {

            console.log(error);
        }
    }

    return (

        <div className="sidebar">

            <div className="logo-section">

                <h1>
                    📚 STUDYFLOW
                </h1>

                <p>
                    Smart Student Dashboard ⚡
                </p>

            </div>

            <div className="nav-links">

                <div className="nav-item">

                    🏠 Dashboard

                </div>

                <div className="nav-item">

                    📋 Tasks

                </div>

                <div className="nav-item">

                    📊 Statistics

                </div>

                <div className="nav-item">

                    ⚙ Settings

                </div>

            </div>

            {children}

            <button
                className="logout-btn"
                onClick={handleLogout}
            >

                Logout 🚪

            </button>

        </div>

    );
}

export default Sidebar;