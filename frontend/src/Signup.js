import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

function Signup() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/signup', { name, email, password })
        .then(res => {
            navigate('/Login')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-sceondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Name</strong>
                        </label>
                        <input 
                          type="text"
                          placeholder="Enter Name"
                          autoComplete="off"
                          name="email"
                          className="form-control rounded-0"
                          onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                          type="email"
                          placeholder="Enter EMAIL"
                          autoComplete="off"
                          name="email"
                          className="form-control rounded-0"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input 
                          type="password"
                          placeholder="Enter Password"
                          autoComplete="off"
                          name="email"
                          className="form-control rounded-0"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                    <p>Already have an Account</p>
                    <Link to="/Login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                        Login
                    </Link>            
            </div>
        </div>
    );
}

export default Signup;