import { useState } from "react";
import { useRegisterMutation } from "../redux/api/authApi";

const Register = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [register] = useRegisterMutation();

    const handleRegister = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            await register(credentials); // Await the registration
            setCredentials({ name: "", email: "", password: "" }); // Reset form after successful registration
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    return (
        <main>
            <h1>Enter your credentials</h1>
            <form className="form-group custom-form" onSubmit={handleRegister}> {/* Use onSubmit to handle form submission */}
                <label>Email</label>
                <input
                    type="email"
                    placeholder=""
                    className="form-control"
                    value={credentials.email}
                    onChange={(e) => {
                        setCredentials((prev) => ({ ...prev, email: e.target.value }));
                    }}
                />
                <br />
                <label>Password</label>
                <input
                    type="password"
                    placeholder=""
                    className="form-control"
                    value={credentials.password}
                    onChange={(e) => {
                        setCredentials((prev) => ({ ...prev, password: e.target.value }));
                    }}
                />
                <br />
                <button type="submit" className="btn btn-warning btn md"> {/* Submit button should trigger form submission */}
                    Register
                </button>
            </form>
        </main>
    );
};

export default Register;

