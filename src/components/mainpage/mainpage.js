import "./imge.css"
import image from "../../assets/images/bubble.png"
import {Link} from "react-router-dom"

let Main = ()=>{
    console.log("main page")
return<>

<div className="image">
    <div className="navebar">
        <div><h2>OLX beach dey</h2></div>
       <div className="regester"> 
        <Link to="/signin"><button>signin</button></Link>
        <Link to="/signup"><button>signup</button></Link> 
    </div>
    </div>

    <div className="content">
        <small>Welcome to our</small><br/>
        <h1>Buying and Selling App</h1>
        <Link to="/Olx"><button>Get started</button></Link> 
    </div>

    <div className="bubbles">
        <img src={image}/>
        <img src={image}/>
        <img src={image}/>
        <img src={image}/>
        <img src={image}/>
        <img src={image}/>
        <img src={image}/>
        <img src={image}/>
        <img src={image}/>
    </div>


</div>






</>
}


export default Main