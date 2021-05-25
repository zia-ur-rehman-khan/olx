import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./buyerpage.scss";
import firebase from "firebase";

let Buyerpage = ({ item, CardId }) => {
  let productimage = item.productImage;
  const userlength = useSelector(state => state.user)
  let productsdetailed = useSelector((state) => state.productsdetailed);
// console.log(userlength.uid,item.userID,"userdsasdasdas")
  var count = item?.buy?.count || 0;  
let buy = () => {
  count += 1
    // var userpost = Object.entries(productsdetailed).filter((item) => {
      // console.log(item[0],"key")
    // console.log(item[1],"values")
      // return item[0] === CardId;
    // });
    let tempItem = item;
    // var name = userpost.map((item) => {
    //   console.log(item[1],"by wali list")
    //   return item[1];
    // });
    
    tempItem.buy = { buyrequest: "send", read: true, Name: userlength?.userName,count };
    // console.log(userpost,"userssssss")
    // let id = userpost[0][0];
    // userpost = new Map(userpost);
    // userpost = Object.fromEntries(userpost);
    // console.log (userpost,"user add with buy property") /
    // console.log(tempItem,"all items")

    firebase
      .database()
      .ref("productsdetailed/"+CardId)
      .set(tempItem)
      .then(() => {
        alert("your buying request is send succesfully");
      })
      .catch(() => {
        alert("something went wrong");
      });
  };

  return (
    <>
      <div className="carousel-first">
        <Carousel fade>
          {productimage.map((item, index) => {
            return (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={productimage[index]}
                  alt={index}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>

      <div className="text">{item.price}</div>
      <div className="text">{item.category}</div>
      <div className="text">{item.condition}</div>
      <div className="text">{item.location}</div>
      <div className="text">{item.discription}</div>
     {userlength.uid !== item.userID ?<div>
        <button onClick={buy}>Buy now</button>
      </div> : <></>}
      

    </>
  );
};
export default Buyerpage;
