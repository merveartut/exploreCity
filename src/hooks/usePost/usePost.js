import React, { useState } from "react";
import axios from "axios";

function usePost() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addUser = async (user) => {
    try {
      setLoading(true);

      // const response = await axios.post(
      //   "http://localhost:8080/api/auth/signup",
      //   {
      //     ...user,
      //   }
      // );
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/auth/signup",
        data: user,
        headers: {
          "Content-Type": "application/json",
        },
      })
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const loginUser = async (user) => {
    try {
      setLoading(true);
      const response = await axios({
        method: "post",
        url: "http://localhost:8080/api/auth/login",
        data: user,
      });
      // const token = response.data.token
      // if (token) {
      //   localStorage.setItem("authToken", token)
      //   alert("Login Success !")
      // } else {
      //   alert("No token received!")
      // }
      await setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return { data, loading, error, addUser, loginUser };
}
export default usePost;
