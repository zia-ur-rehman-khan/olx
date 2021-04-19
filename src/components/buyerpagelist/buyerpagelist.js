import { NavItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import Buyerpage from "../buyerpage/buyerpage";



let Buyerpagelist = (props) => {
    let productsdetailed = useSelector((state) => state.productsdetailed);
    let CardUserId= props.computedMatch.params.id
    // console.log(props,"propsssssss")
    
    
  
return <>
  
{
  Object.entries(productsdetailed).filter( 
    (item )=> item[0] === CardUserId).map(item =>{
    return <Buyerpage item={item[1]} CardId={item[0]} />}
  )
}
  
    
  
  
  </>;
};

export default Buyerpagelist;
