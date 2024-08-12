import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Users.module.css";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Button } from "react-bootstrap";
import useDelete from "../../hooks/useDelete/useDelete";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const loggedIn = useSelector((state) => state.loggedIn.value);
  const { data, loading, error, deleteUser } = useDelete();
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate()
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
  if (loggedIn) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Users</h1>

        <div className={styles.searchBox}>
          <input
            className={styles.searchInput}
            placeholder="Search User"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <ul>
          <CardGroup
            style={{ gap: 30, alignItems: "center", justifyItems: "center" }}
          >
            {searchResult.map((user) => (
              <li key={user.id} className={styles.item}>
                <Card className={styles.card}>
                  <Card.Header
                    style={{
                      fontSize: 20,
                      height: 70,
                      textAlign: "center",
                      backgroundColor: "#302e2e",
                      borderColor: "whitesmoke",
                      alignContent: "center",
                    }}
                  >
                    <Link style={{ color: "white" }} to={`/users/${user.id}`}>
                      {user.firstName} {user.lastName}
                    </Link>
                  </Card.Header>
                  <Card.Body style={{ backgroundColor: "#302e2e" }}>
                    <Card.Text style={{ color: "whitesmoke" }}>
                      <ul>
                        <li>
                          <p>Country: {user.country}</p>
                        </li>
                        <li>
                          <p>E-mail: {user.email}</p>
                        </li>
                      </ul>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer
                    style={{
                      backgroundColor: "#302e2e",
                      justifyContent: "flex-end",
                      display: "flex",
                      borderWidth: "0px",
                    }}
                  >
                    <IconButton
                      aria-label="delete"
                      onClick={() => removeUser(user.id)}
                    >
                      <DeleteIcon style={{ color: "white" }} />
                    </IconButton>
                  </Card.Footer>
                </Card>
              </li>
            ))}
          </CardGroup>
        </ul>
      </div>
    );
  } else {
    return (
      <div className={styles.loginContainer}>
        <h1>Login to see users !</h1>
        <MDBBtn onClick={() => navigate("/login")} className={styles.loginButton} type="button">
          LOGIN
        </MDBBtn>
      </div>
    );
  }
}

export default Users;
