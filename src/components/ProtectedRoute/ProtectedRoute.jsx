import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
  const [isTokenValid, setIsTokenValid] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("authToken")
  const loggedIn = useSelector((state) => state.auth.loggedIn)

  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  // useEffect(() => {
  //   const verifyToken = async () => {
  //       if (!token) {
  //           navigate('/login')
  //           return
  //       }
  //       try {
  //           const response = await axios.post()
            
  //       } catch (error) {
            
  //       }
  //   }
  // })
  return children
}

export default ProtectedRoute