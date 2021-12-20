import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  let navigate = useNavigate();
  const initialUserState = {
    name: "",
    id: "",
  };
  const [user, setUser] = useState(initialUserState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user);
    navigate("/restaurants");
  };

  return (
    <div
      className="m-auto w-50 bg-dark shadow-lg rounded d-flex align-items-center justify-content-center"
      style={{ height: "80vh" }}
    >
      <div className="submit-form w-75">
        <div>
          <div className="form-group">
            <label htmlFor="user" className="text-white mb-3 mt-3">
              Username
            </label>
            <input
              type="text"
              className="form-control py-2"
              id="name"
              required
              placeholder="Enter your username"
              value={user.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="id" className="text-white mb-3 mt-3">
              ID
            </label>
            <input
              type="text"
              className="form-control py-2"
              id="id"
              required
              placeholder="Enter your password"
              value={user.id}
              onChange={handleInputChange}
              name="id"
            />
          </div>

          <button onClick={login} className="py-2 btn btn-success mt-5 w-100">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
