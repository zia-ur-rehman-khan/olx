import "./Add-products.scss";
import image from "../../assets/images/photo.png";
import loader from "../../assets/images/loader.webp"
import imagemain from "../../assets/images/for.jpg";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { useState } from "react";

import back from "../../assets/images/back.png";
import { Link, useHistory } from "react-router-dom";
// import { Spinner } from "react-bootstrap";

let Productsdetailed = () => {
  const history = useHistory();
  let [category, setcategory] = useState("");
  let [condition, setcondition] = useState("");
  let [discription, setdiscription] = useState("");
  let [price, setprice] = useState("");
  let [photos, setphotos] = useState("");
  let [location, setlocation] = useState("");
  let [load, setload] = useState(false);
  let user = useSelector((state) => state.user);
  let postAD = () => {
    var productsdetailes = {
      category,
      condition,
      discription,
      price,
      location,
      by: user?.userName,
      userID: user?.uid,
    };
    // console.log(user.uid,"IDIDIDIDIDIID   ")
    if (!user || photos.length !== 5) {
      alert("at least 5 images");
    } else {
      setload(true);
      let temp = [];
      Object.values(photos).map((items) => {
        let ID = Date.now();
        let uploadimage = firebase
          .storage()
          .ref()
          .child("images/" + ID);
        return uploadimage.put(items).then(() => {
          uploadimage.getDownloadURL().then((url) => {
            temp.push(url);
            if (temp.length === photos.length) {
              productsdetailes.productImage = temp;
              firebase
                .database()
                .ref("productsdetailed/" + Date.now())
                .set(productsdetailes)
                .then(() => {
                  history.push("/");
                  setload(false);
                });
            }
          });
        });
      });
    }
  };
  return (
    <>
    {load ? (
            <div className="duck">
              {/* <Spinner animation="border" role="status" ></Spinner> */}
              <img src={loader}/>
            </div>
          ) : (
            
          
      <div className="contents">
        <img className="mainimage" src={imagemain} />

        <div className="header">
          <h1>POST YOUR AD</h1>{" "}
        </div>
        <div className="wrapper">
          <div className="feilds">
            <label for="category">
              Choose a category *
              <select
                id="category"
                onChange={(e) => setcategory(e.target.value)}
                value={category}
              >
                <option value="cloths">cloths</option>
                <option value="sports">sports</option>
                <option value="electronics">electronics</option>
              </select>
            </label>
          </div>
          <div className="feilds">
            <label for="condition">
              Condition *
              <select
                id="condition"
                onChange={(e) => setcondition(e.target.value)}
                value={condition}
              >
                <option value="new">new </option>
                <option value="used">used</option>
              </select>
            </label>
          </div>
          <div className="feilds">
            <label>
              Description *
              <textarea
                cols="6"
                rows="6"
                className="padding"
                onChange={(e) => setdiscription(e.target.value)}
                value={discription}
              />
            </label>
          </div>
          <div className="feilds">
            <label>
              Price *
              <input
                type="text"
                placeholder="Price of your product"
                className="padding"
                onChange={(e) => setprice(e.target.value)}
                value={price}
              />
            </label>
          </div>
          <div className="feilds">
            Upload product *
            <label id="photo">
              <img src={image} className="images" />
              <input
                type="file"
                multiple
                className="hide"
                onChange={(e) => setphotos(e.target.files)}
              />
            </label>
            <small>* At least 5 photos*</small>
          </div>

          <div className="feilds">
            <label>
              Conform your location *
              <textarea
                cols="4"
                rows="4"
                className="padding"
                onChange={(e) => setlocation(e.target.value)}
                value={location}
              />
            </label>
          </div>
          <div className="button">
            <button
              onClick={() => {
                postAD();
              }}
            >
              Post now{" "}
            </button>
          </div>
          <div className="go-back">
            <Link to="/">
              <img src={back}></img>
              <b> Go to back </b>
            </Link>
          </div>
        </div>
      </div>
    )}
    </>
    
  );
};


export default Productsdetailed;
