import React, { useState, useEffect } from "react";
import Axios from "axios";

const ProfilePage = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3001/user").then((response) => {
        console.log(response.data);
        setUser(response.data);
      });
  }, [user]);

  const handleChange = (e) => {
      console.log("Enters Handle Change");
    const { name, value } = e.target;
    setUser(prevState => ({
        ...prevState,
        [name]: value
    }));
    console.log(user)
};


  return (
    <div>
      <h3>Profile Page</h3>
      {user != null ? (
          <div>
        <div className="form-group">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          value={user.fName}
          name="fName"
          onChange={(e) => {
              console.log("Test");
          }}
        />
      </div>

      <div className="form-group">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          value={user.lName}
          name="lName"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={user.email}
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>
          Password - Need to contain a ! and have more than 6 characters
        </label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block"
        onClick={() => this.updatePassword(this.state)}
      >
        Update Info
      </button>
      <button
        type="submit"
        className="btn btn-primary btn-block btn-warning"
        onClick={() => this.deleteAccount(this.state)}
      >
        Delete Account
      </button>
      </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default ProfilePage;
