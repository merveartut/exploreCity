import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Users.module.css";
import Card from "react-bootstrap/Card";
import CardGroup from "../CardGroup/CardGroup";
import { Button } from "react-bootstrap";
import useDelete from "../../hooks/useDelete/useDelete";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const { data, loading, error, deleteUser } = useDelete();
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios("http://localhost:3000/users").then((res) => setUsers(res.data));
  }, [data]);
  const searchResult = users.filter((user) => {
    return Object.keys(user).some((key) => {
      return user[key]
        .toString()
        .toLowerCase()
        .includes(filterText.toLowerCase());
    });
  });
  const removeUser = (id) => {
    console.log(id);
    deleteUser(id);
  };
  console.log(searchResult)
  if (loggedIn) {
    return (
      <div className={styles.container}>

        <div className={styles.searchBox}>
          <input
            className={styles.searchInput}
            placeholder="Search User"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <CardGroup items={searchResult}></CardGroup>
      </div>
    );
  } else {
    return (
      <div className={styles.loginContainer}>
        <h1>Login to see users !</h1>
        <MDBBtn
          onClick={() => navigate("/login")}
          className={styles.loginButton}
          type="button"
        >
          LOGIN
        </MDBBtn>
      </div>
    );
  }
}

export default Users;
