import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Auth from "../routes/Auth";
import Home from "../routes/Home";

const AppRouter = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <Router>
            <Routes>
                {isLoggedIn ? (
                    <Route path="/" element={<Home/>}/>
                ) : (
                    <Route path="/" element = {<Auth/>}/>
                )}
            </Routes>
        </Router>
    )
}

export default AppRouter;