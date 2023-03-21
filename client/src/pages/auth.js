import { useState } from "react";
import axios from 'axios';
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'

export const Auth = () => {
    return <div className="auth">
        <Login />
        <Register />
    </div>;
};


const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    //only need set function
    const [, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // response will recieve everything back including token
            const response = await axios.post("http://localhost:3001/auth/login", {
                username,
                password
            });
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/")
            console.log(response);
        } catch(err) {
            console.error(err)
        }
    }
    return (
        <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label="Login"
            onSubmit={onSubmit}
            />
        )
}

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const onSubmit = async (e) => {
        e.preventDefault();

        //axios simplifies fetching
        try {
            await axios.post("http://localhost:3001/auth/register", {
                username,
                password
            });
            alert("Registration Completed! Now Login.")
        } catch (err) {
            //makes text red when consoling error
            console.error(err);
        }
    };

    return (
    <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Register"
        onSubmit={onSubmit}
        />
    )
}

// allows us to reuse template for both login and register functions. label prop to change button
const Form = ({
    username,
    setUsername,
    password,
    setPassword,
    label,
    onSubmit
}) => {
    return (
    <div className="auth-container">
        <form onSubmit={onSubmit}>
            <h2> {label} </h2>
            <div className="form-group">
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">{label}</button>
        </form>
    </div>
    )
}
