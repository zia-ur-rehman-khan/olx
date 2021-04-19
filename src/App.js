import Signin from "./components/authentication/signin/signin";
import Signup from "./components/authentication/signup/signup";
import Olx from "./components/landing-page/olx";
import loader from "./assets/images/loader.webp";
import Buyerpagelist from "./components/buyerpagelist/buyerpagelist";
import Productsdetailed from "./components/Add-products/products-detailed";
import Main from "./components/mainpage/mainpage";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { firebaseConfig } from "./firebase";
// import { Spinner } from "react-bootstrap";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Userdeatailes from "./components/userdetailes/userdetailes";
firebase.initializeApp(firebaseConfig);

let App = () => {
  const dispatch = useDispatch();
  const userlength = useSelector((state) => state.user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "user",
          payload: user,
        });
        firebase
          .database()
          .ref("user/" + userlength.uid)
          .on("value", (snapshot) => {
            const data = snapshot.val() ? snapshot.val() : [];
            dispatch({
              type: "username",
              payload: data?.username,
            });
          });

        firebase
          .database()
          .ref("productsdetailed/")
          .on("value", (snapshot) => {
            const data = snapshot.val() ? snapshot.val() : [];
            dispatch({
              type: "productsdetailed",
              payload: data,
            });
          });
      } else {
        dispatch({
          type: "user",
          payload: false,
        });
      }
    });
  }, [userlength?.uid]);

  if (userlength === "loading")
    return (
      <div className="duck">
        <img src={loader} />
        {/* <Spinner animation="border" role="status"></Spinner> */}
      </div>
    );

  return (
    <>
      <BrowserRouter>
        <Switch>
          <PrivateRoute
            path="/"
            condition={!userlength?.uid}
            SuccessComp={Main}
            failPath={"/olx"}
            exact
          />
          <Route path="/olx" exact>
            <Olx />
          </Route>
          <PrivateRoute
            path={"/signin"}
            exact
            condition={!userlength?.uid}
            SuccessComp={Signin}
            failPath={"/"}
          />
          <PrivateRoute
            path={"/signup"}
            exact
            condition={!userlength?.uid}
            SuccessComp={Signup}
            failPath={"/"}
          />
          <PrivateRoute
            path={"/products-detailed"}
            condition={userlength?.uid}
            SuccessComp={Productsdetailed}
            failPath={"/signin"}
          />
          <PrivateRoute
            path={"/buyerspage/:id"}
            condition={userlength?.uid}
            SuccessComp={Buyerpagelist}
            failPath={"/signin"}
          />
          <PrivateRoute
            path={"/user-detailes"}
            condition={userlength?.uid}
            SuccessComp={Userdeatailes}
            failPath={"/Olx"}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};

let PrivateRoute = ({ condition, SuccessComp, failPath, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (condition ? <SuccessComp {...rest} /> : <Redirect to={failPath} />)}
    />
  );
};

export default App;
