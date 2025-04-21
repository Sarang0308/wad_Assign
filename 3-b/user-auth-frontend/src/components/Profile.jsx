import { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({ token, userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get(`/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        alert("Unable to fetch user.");
      }
    };
    if (token && userId) getProfile();
  }, [token, userId]);

  return (
    <div className="text-center mt-10">
      {user ? (
        <div>
          <h2 className="text-xl font-bold">Welcome, {user.username}</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Profile;
