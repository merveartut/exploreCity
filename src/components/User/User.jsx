import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function User() {
    const { id } = useParams()
    const [user, setUser] = useState({})
    useEffect(() => {
        axios(`http://localhost:3000/users/${id}`)
        .then((res) => setUser(res.data))
    }, [])
  return (
    <div>
        <pre >
            {user.firstName} {user.lastName}
        </pre>

    </div>
  )
}

export default User