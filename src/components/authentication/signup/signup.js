import "./style.scss";
import users from "../../../assets/images/user.png";
import back from "../../../assets/images/back.png";
import lock from "../../../assets/images/padlock.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import firebase from "firebase";
import { useSelector } from "react-redux";
let Signup = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  let user = useSelector((state) => state.user);

  
  let createuser = (event) => {
    event.preventDefault();
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
        alert("signup succesfully");
        setusername("");
        setemail("");
        console.log(res, "res")
        firebase
          .database()
          .ref("user/" + res?.user?.uid)
          .set({
            username,
          });
        setpassword("");
    })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        seterror("Error:" + errorMessage);
      });
  };

  return (
    <>
      <div className="pic">
        <div class="login-box">
          <h1>Signup</h1>
          <div class="textbox">
            <img className="img" src={users} />
            <input
              type="text"
              required
              value={username}
              placeholder="User Name"
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div class="textbox">
            <img className="img" src={users} />
            <input
              type="text"
              required
              value={email}
              placeholder="User Email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div class="textbox">
            <img className="img" src={lock} />
            <input
              type="password"
              required
              value={password}
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <input id="btn" type="button" onClick={createuser} value="Sign up " />
          <div>
            <p>
              <em>
                {" "}
                you have no account plz{" "}
                <Link to="/signin">
                  <b>signin</b>
                </Link>{" "}
              </em>
            </p>
            <br />

            <Link to="/">
              <img src={back}></img>
              <b>Go to mainpage</b>
            </Link>
            <br />
          </div>
          <div className="error">
            <em>{error}</em>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
