import { useEffect, useState } from "react";

export const useUser = () => {
    const [user, setUser] = useState(null);

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
    }, []);

    return user;
};