import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Import navigate hook

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const parsedUser = JSON.parse(userString);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, [navigate]);

  return user;
};
