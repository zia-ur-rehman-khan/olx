import Card  from "../card/card";
import { useSelector } from "react-redux";
import "./cardlist.scss";
import { Link } from "react-router-dom";

let Cardlist = () => {
  let productsdetailed = useSelector((state) => state.productsdetailed);
  let search = useSelector(state => state.search)
  // console.log(productsdetailed,"search")
  return (
    <>
      <div className="carddiv">
        
        {Object.entries(productsdetailed).filter(
          item =>item[1].category?.includes(search) || item[1].discription?.includes(search)
        ).map((item, index) =>
{  
  // console.log(item[0] ,"date. now wali id")
  return (
  <Link to={"/buyerspage/"+item[0]}> <Card item={item[1]} id={item[0]} index={index} /></Link>)
         
  })}
      </div>
    </>
  );
};

export default Cardlist;
