import React, {useState} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import {useHistory} from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const history = useHistory();
  const [data, setData] = useState({
    credentials: {
      username: "",
      password: ""
    },
    value: ""
  })

  const handleChanges = event => {
    setData({
      credentials: {
        ...data.credentials,
        [event.target.name]: event.target.value,
      }
    });
  }

  const login = event => {
    event.preventDefault();
    setData({
      value: ""
    });
    axiosWithAuth()
    .post('/login', data.credentials)
    .then(response => {
      console.log("response from login", response)
      window.localStorage && window.localStorage.setItem('token', response.data.payload)
      history.push('/colors');
    })
    .catch(error => {
      console.log("Unable to login", error)
    })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form>
        <input type="text" name="username" value={data.username} onChange={handleChanges} placeholder={"username"} />
        <input type="text" name="password" value={data.password} onChange={handleChanges} placeholder={"password"} />
        <button onClick={login}>Login</button>
      </form>
    </>
  );
};

export default Login;
