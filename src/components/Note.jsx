import React from "react";
import { Link } from "react-router-dom";

const Note = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <div>
                <div>
                    <h1 style={{ marginBottom: "20px" }}>So far</h1>
                    <ul>
                        <li>Sign In</li>
                        <li>Sign Up</li>
                        <li>Discover - NAVBAR LIBRARY</li>
                        <li>Activity - NAVBAR</li>
                        <li>
                            Categories Interior - <Link to="/library/categories-interior">Click me</Link>
                        </li>
                        <li>
                            Class - <Link to="/library-class">Click me</Link>
                        </li>
                        <li>
                            Course - <Link to="/library-course">Click me</Link>
                        </li>
                        <li>History - NAVBAR LIBRARY</li>
                        <li>
                            My Courses - <Link to="/library/saved/my-courses">Click me</Link>
                        </li>
                        <li>Saved - NAVBAR LIBRARY</li>
                        <li>Search - NAVBAR LIBRARY</li>
                        <li>Daily Snapshot - NAVBAR</li>
                        <li>Portfolio</li>
                        <li>Portfolio Modal</li>
                        <li>Categories</li>
                        <li>filter bar</li>
                        <li>Add class</li>
                    </ul>
                </div>
                <div>
                    <h1 style={{ marginBottom: "20px" }}>Coming soon...</h1>
                    <ul>
                        <li>404 NOT FOUND</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Note;
