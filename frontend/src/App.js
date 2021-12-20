import React, { useState } from "react";
import { Link, Route, Router, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantsList from "./components/RestaurantsList";
import Restaurant from "./components/Restaurant";
import AddReview from "./components/AddReview";
import Login from "./components/Login";

const App = () => {
  const [user, setUser] = useState(null);

  const login = (user = null) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            {user ? (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route
            path="/"
            element={
              <main style={{ padding: "1rem" }}>
                <p>Welcome to Restaurant Review system!</p>
              </main>
            }
          />
          <Route path="/login" element={<Login login={login} />} />
          <Route exact path={"/restaurants"} element={<RestaurantsList />} />
          <Route path="/restaurants/:id" element={<Restaurant user={user} />} />
          <Route path="/edit" element={<Restaurant user={user} />} />

          <Route
            path="/restaurants/:id/review"
            element={<AddReview user={user} />}
          />

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
