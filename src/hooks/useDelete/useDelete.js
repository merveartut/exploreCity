import axios from "axios";
import { useState } from "react";

function useDelete() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const deleteUser = async (id) => {
    try {
      setLoading(true);
      axios({
        method: "delete",
        url: `http://localhost:3000/users/${id}`,
      }).then((res) => setData(res));
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  return { data, loading, error, deleteUser };
}

export default useDelete;
