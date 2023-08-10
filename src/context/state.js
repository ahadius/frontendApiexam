import React, { useEffect, useState } from "react";
import context from "./context.js";
const host = "http://localhost:5000";

const State = (props) => {
  const [activity, setactivity] = useState([]);
  const [users, setusers] = useState([]);
  const login = async (data) => {
    const response = await fetch(`${host}/api/user/login`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("secret-login-token", json.token);
      localStorage.setItem("secret-login-info", json.userdata.role);
      localStorage.setItem("secret-login-name", json.userdata.email);
      alert(
        `Welcome aboard, ${json.userdata.email}! Get ready to track, conquer, and celebrate your activities with us.`
      );
      if (json.userdata.role === "admin") {
        window.location.href = "/add";
      } else {
        window.location.href = "/";
      }
    } else {
      alert(json.message);
    }
  };
  const getallactivity = async (data) => {
    const response = await fetch(`${host}/api/user/activity`, {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        Authentication: localStorage.getItem("secret-login-token"),
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.success) {
      setactivity(json.activities);
    } else {
      alert(json.message);
    }
  };
  const getalladminactivity = async (data) => {
    const response = await fetch(`${host}/api/admin/activity`, {
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        Authentication: localStorage.getItem("secret-login-token"),
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.success) {
      setactivity(json.activity);
    } else {
      alert(json.message);
    }
  };
  const getusers = async (data) => {
    const response = await fetch(`${host}/api/admin/allusers`, {
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        Authentication: localStorage.getItem("secret-login-token"),
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.success) {
      setusers(json.users);
    } else {
      alert(json.message);
    }
  };
  const addactivity = async (data) => {
    const response = await fetch(`${host}/api/admin/addactivity`, {
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        Authentication: localStorage.getItem("secret-login-token"),
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.success) {
      window.location.reload();
    } else {
      alert(json.message);
    }
  };
  const editactivity = async (data) => {
    const response = await fetch(`${host}/api/admin/activity/user`, {
      method: "put",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        Authentication: localStorage.getItem("secret-login-token"),
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.success) {
      window.location.reload();
    } else {
      alert(json.message);
    }
  };
  const addhours = async (data) => {
    const response = await fetch(`${host}/api/user/bookhours`, {
      method: "post",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        Authentication: localStorage.getItem("secret-login-token"),
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.success) {
      window.location.reload();
    } else {
      alert(json.message);
    }
  };
  const delactivity = async (data) => {
    const response = await fetch(`${host}/api/admin/activity`, {
      method: "delete",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Content-Type": "application/json",
        Authentication: localStorage.getItem("secret-login-token"),
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.success) {
      window.location.reload();
    } else {
      alert(json.message);
    }
  };
  return (
    <context.Provider
      value={{
        delactivity,
        addhours,
        login,
        activity,
        getallactivity,
        getalladminactivity,
        getusers,
        users,
        addactivity,
        editactivity,
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default State;
