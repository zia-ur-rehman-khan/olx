import { useDispatch, useSelector } from "react-redux";
import "./card.scss";
import image from "../../assets/images/cross.jpg";
// import {Toast} from 'react-bootstrap'
// import {Row} from 'react-bootstrap'
// import {Col} from 'react-bootstrap'
// import {Button} from 'react-bootstrap'
import firebase from "firebase";
import { useState } from "react";

let Card = ({ item, id, showCloseIcon,buyer }) => {
  let products = useSelector((state) => state.productsdetailed);
  
  // console.log(buyer,"buy wala option")
  // let dispatch = useDispatch()
   
  
   

  // console.log(products,"all products") 
  let deletedata = () => {
    var allproducts = products;
    var afterdelete = Object.entries(allproducts).filter((data, index1) => {
      return id !== data[0];

    });
    afterdelete = new Map(afterdelete)
    afterdelete = Object.fromEntries(afterdelete)
    // console.log(afterdelete,"after deletes and converted")
    firebase
      .database()
      .ref("productsdetailed/")
      .set(afterdelete)
      .then(() => {
        alert("your AD deleted succesfully");
      })
      .catch(() => {
        alert("something went wrong");
      });
  };



  return (
    <>
      <div className="card">
        {showCloseIcon ? (
          <div className="imagesss">
            <img src={image} onClick={()=>deletedata(id)} />
          </div>
        ) : (
          <></>
        )}
        <div className="imagess">
          <img src={item?.productImage[1]} />
        </div>
        <div className="price">
          <p>
            <b>{item.price}</b>
          </p>
        </div>
        <div className="discription">
          <span>{item.discription}</span>
        </div>
      </div>
      
      
      
    </>
  );
};

export default Card;
