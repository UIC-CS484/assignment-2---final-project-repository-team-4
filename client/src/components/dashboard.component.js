import React, { useState, useEffect } from "react";
import Axios from "axios";

const Dashboard = () => {
  Axios.defaults.withCredentials = true;

  const [name, setName] = useState(null);

  const getUser = () => {
    Axios.get("http://localhost:3001/user").then((response) => {
      console.log(response);
      setName(response.data.fName);
    });
  };

  const logout = () => {
    Axios.get("http://localhost:3001/logout").then((response) => {
      setName(null);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {name ? (
        <div>
          Welcome {name}!<button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>Not Logged In</div>
      )}
    </div>
  );
};

export default Dashboard;