import "./olx.scss"
import image from "../../assets/images/download.png"
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import {useState} from 'react'
import Cardlist from '../cardlist/cardlist'

import {useDispatch, useSelector} from 'react-redux'
import Card from "../card/card"



let Olx = ()=>{
const [search,setsearch] = useState("")
const userlength = useSelector(state => state.user)
const  name = useSelector(state => state.user?.userName)
let productsdetailed = useSelector(state => state.productsdetailed)
// console.log(name,"name")
// console.log("helllllllllllll")
let dispatch = useDispatch()
    let logout = ()=>{
        firebase.auth().signOut()
        .then(() => {

            dispatch({
                type: "logout",
                payload: ""
            })
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        });

    }

//     let searchs = (data)=>{

// dispatch({
//     type = "search",
//     payload=data


// })

    //     console.log(search + "search")
    // var hello=Object.values(productsdetailed)?.filter(item=> {return item?.category === search})
    // console.log(hello)

    // Object.values(hello).forEach(item =>
    //     {
    //         console.log(item , 'itemsss')
    //         dispatch({
    //         type : "search",
    //         payload:item
    //     })
        
    // }
        
    //     )

    // }


    return<>
<div className="body">
<div className="navbarsss">
    <div className="img">
        <img src={image}/>
    </div>
    <div className="searchbar">
    Search <input type="search" onChange={e =>dispatch({type:"search", payload: e.target.value}) } />
    </div>
    <div className="button">
        {userlength.uid?(<Link to="/products-detailed"><button>+sell</button></Link>):
        (<Link to="/signup"><button>+sell</button></Link>)}
        {userlength.uid ? (<button onClick={logout}>Logout</button>):
        (<div><Link to="/signup"><button>sign up </button></Link><Link to ="/signin"><button>sign in</button> </Link></div>)}
    </div>
    <div className="button2">
       {userlength.uid?(<Link to="/user-detailes"> <button>{name}</button></Link>):(<></>)}
    </div>
</div>
<Cardlist/>
</div>

    </>
}

export default Olx;