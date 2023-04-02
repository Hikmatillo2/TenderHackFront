import React, {useState} from "react"
import Error from "../Error";
import {useNavigate} from "react-router-dom";


export default function Auth () {
    const navigate = useNavigate();

    const initialFormData = Object.freeze({
        login: "",
        password: "",
        name: ""
    });
    let [authMode, setAuthMode] = useState("signin")
    const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (e: any) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        let requestUrl = '';
        if (authMode === 'signin') {
            requestUrl = 'http://127.0.0.1:8080/api/login';
        } else {
            requestUrl = 'http://127.0.0.1:8080/api/register'
        }
        let result: Response;
        try {
            console.log(formData)
            console.log(requestUrl)
            result = await fetch(requestUrl,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
            console.log(result)
        } catch (e) {
            navigate('/error');

            return;
        }
        console.log(result)
        if (result.status == 200) {
            navigate('/account');
            return;
        } else {
            navigate('/error');
            return;
        }
    };

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    if (authMode === "signin") {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
                        </div>
                        <div className="form-group mt-3" onChange={handleChange}>
                            <label>Login</label>
                            <input
                                name="login"
                                type="login"
                                className="form-control mt-1"
                                placeholder="Enter login"
                            />
                        </div>
                        <div className="form-group mt-3" onChange={handleChange}>
                            <label>Password</label>
                            <input
                                name="password"
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" onClick={handleSubmit} className="glow-on-hover">
                                Submit
                            </button>
                        </div>
                        <p className="text-center mt-2">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
                    </div>
                    <div className="form-group mt-3" onChange={handleChange}>
                        <label>Full Name</label>
                        <input
                            name="name"
                            type="login"
                            className="form-control mt-1"
                            placeholder="e.g Jane Doe"
                        />
                    </div>
                    <div className="form-group mt-3" onChange={handleChange}>
                        <label>Login</label>
                        <input
                            name="login"
                            type="login"
                            className="form-control mt-1"
                            placeholder="Login"
                        />
                    </div>
                    <div className="form-group mt-3" onChange={handleChange}>
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" onClick={handleSubmit} className="glow-on-hover">
                            Submit
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form>
        </div>
    )
}
