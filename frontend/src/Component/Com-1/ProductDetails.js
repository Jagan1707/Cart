import React, { version } from "react";
import { BrowserRouter as Router,Routes,Route,Link, useLocation,style, useNavigate} from 'react-router-dom';
import axios  from "axios";
import swal from 'sweetalert';
import {useDispatch} from 'react-redux';
import {addTocart} from '../features/Cartslice'

const Productdetails = () =>{
const {state} = useLocation();
const navigate = useNavigate();
console.log("prodata",state);
const role = localStorage.getItem('role');
console.log(role)
const dispatch = useDispatch();

const deleteProduct = (uuid) =>{
    axios.delete(`http://localhost:8080/product/Delete?uuid=${uuid}`,{headers:{"token":localStorage.getItem("token")}}).then(result=>{
        console.log('data',result.data.status);
        if(result.data.status == 'success'){
            swal({
                title: "DELETED SUCCESS!",
                text: "SUCESSE",
                icon: "success",
                button: "OK",
                
              });
            //   navigate('/product')
        }
    }).catch(err=>{
        console.log('err',err.message)
    })
}
const totalcart = (uuid) =>{
    axios.get(`http://localhost:8080/oder/Cart?uuid=${uuid}`).then(result=>{
        console.log("total",result.data)
        if(result.data.status == 'success'){
            swal({
                title: "Added To cart!",
                text: `${state.Producttype}`,
                icon: "success",
                button: "OK",
              });
        navigate('/cart',{state:result.data})

        }
    })
}

const addTocart = () =>{
    let uuid = localStorage.getItem('id'); 
    console.log(state.Producttype)
    console.log(state.Image)
    console.log(state.Price)
    console.log(state.Framecolor)
    let cart = {
        productId : state.uuid ,
        productName : state.Producttype,
        ProductColor : state.Framecolor,
        productimg : state.Image,
        quantity : 1 ,
        price : state.Price,
    }
    axios.post(`http://localhost:8080/oder/addToCart?userId=${uuid}`,cart).then(result=>{
        console.log("data",result.data)
        let uuid = result.data.result.uuid
         totalcart(uuid)
        
    }).catch(err=>{
        console.log("err",err.message)
    })
}

    return(
        <>
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                <form class="d-flex" role="search">
                    <input class="form-control me-1 search" type="search" placeholder="What are You looking for" aria-label="Search"/>
                    <button class=" btn2" type="submit">&#128269;</button>      
                    </form>
                    
                    <Link to= {'/home'} className='navbar-brand'>
                        Home
                        </Link>
                        
                        <Link to= {'/'} className='navbar-brand'>
                            Product 
                            </Link>
                   
                        {/* <Link to = {''} onClick={Allproduct}  className = 'navbar-brand'>
                        Category
                        </Link>   */}

                        <Link to = {'/signup'}  onClick={''} className = 'navbar-brand'>
                            Cart
                            </Link>
                            
                            <div className="drobdown">
                        <div className="profile ">
                        <h5>{localStorage.getItem('name')}</h5>
                        <div className="drob-con">
                        <p onClick={()=>  window.location.href = '/' }>Sigin-in</p>
                        <p onClick={()=>  window.location.href = '/signup' }>Sigin-up</p>
                        <p>Log-out</p>
                        </div>
                        </div></div>
                                </div>
                                </nav>


                                <div className="container-fluid flex">
                                    <div className="view">
                                        <div className="saprate">
                                        <img className="img" src={state.Image}/>
                                        </div>
                                        <div className="saprate">
                                        <img className="img" src={state.Image}/>
                                        </div>
                                        <div className="saprate">
                                           <img src="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s11164-c7-full-rim-steel-new-sunglasses_untitled_session4174.jpg" />
                                       </div>
                                       <div className="saprate">
                                           <img src="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s11164-c7-full-rim-steel-new-sunglasses_5_march_female4970.jpg" />
                                       </div>
                                    </div>
                                    <div className="info">
                                       <h5>{state.Brandname}</h5>
                                       <h5>Grey Full Rim {state.Producttype}</h5>
                                       <span>Size : {state.Framesize}</span><br></br>
                                       <span> price : ₹{state.Price}</span><br></br><br></br>
                                       {role == 'user'? <div id="showuser">
                                       <button >BUY NOW</button>
                                       <button onClick={addTocart} type='button' >ADD TO CART</button>
                                       {/* <button onClick={()=>dispatch(addTocart({Producttype : state.Producttype ,Framecolor : state.Framesize ,Framesize : state.Framesize,Price:200}),navigate('/cart'))}>ADD TO CART</button> */}
                                       </div> : <div id="showadmin">
                                       <button className="delete" onClick={()=>deleteProduct(state.uuid)}>DELETE</button>
                                       <button onClick={()=>navigate('/update',{state:state})}>UPDATE</button>
                                       </div>}
                                       <i><h6>PRODUCT DETAILS</h6></i>
                                       <hr></hr>
                                       <div className="product-info">
                                        <ul>
                                            <li>BRAND-NAME : {state.Brandname}</li>
                                            <li>PRODUCT-TYPE : {state.Producttype}</li>
                                            <li>FRAME-COLOR : {state.Framecolor}</li>
                                            <li>FRAME-TYPE : {state.Frametype}</li>
                                            <li>FRAME-SHAPE : {state.Frameshape}</li>
                                            <li>FRAME-SIZE : {state.Framesize}</li>
                                            <li>METERIAL : {state.Material}</li>
                                            <li>GENDER : {state.Gender}</li> 
                                        </ul>
                                        <span>REVIEW : &#9733; &#9733; &#9733; &#9733; &#9733;</span>

                                       </div>


                                        </div>
                                    </div>

    <div className="trend-product">
                        <div className="product-items">
                            <img src ="https://static1.lenskart.com/media/desktop/img/Sep21/image179.png"/>
                            <h4>Round</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/cateeye.jpg"/>
                            <h4>Cat-Eye</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/clubmaster.jpg"/>
                            <h4>Clubmaster</h4>
                            <button>Explore</button>
                        </div>   
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/trans.jpg"/>
                            <h4>Transparent</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/trans.jpg"/>
                            <h4>Transparent</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/airflex.jpg"/>
                            <h4>Air Flex</h4>
                            <button>Explore</button>
                        </div>                     
                     </div>

                     

<div className="footer">
        <i><h4>Buy The Best Eyewear From Eagle-Eye</h4></i>
        <p>A one-stop online solution for purchasing eyewear and its accessories, Lenskart delivers them right at your doorstep with convenient methods of payment. Sunglasses as well as eyeglasses are available for men and women in a diverse array of styles and trendy colours. If you want to try out contact lenses, pick the ones of your choice from the extensive variety of coloured contact lenses from our online store.</p>
            <div className="foot">
                <div className="cont">
                <b><span>Service</span></b>
                <ul>
                    <li>Store Locator</li>
                    <li>Enter My Power</li>
                    <li>Buying Guide</li>
                    <li>Frame Size</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>About Us</span></b>
                <ul>
                    <li>We Are Hiring</li>
                    <li>Refer & Earn</li>
                    <li>About Us</li>
                    <li>Coupons</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>Help</span></b>
                <ul>
                    <li>FAQ's</li>
                    <li>Site Map</li>
                    <li>Payments</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>Social</span></b>
                <ul>
                    <li>Facebooke</li>
                    <li>Twitter</li>
                    <li>Youtube</li>
                </ul>
                </div>
                <div className="cont">
                    
                <img src="https://headstrongperformance.net/wp-content/uploads/2016/04/get-it-on-google-play-vector.png"  />
                <img src="https://miro.medium.com/max/600/1*xqT83bMEz92IBYxS9UQNow.png"/>
                <p>Download Eyekart App to buy EyeGlasses </p>
                 </div>

            </div>
        </div>



        </>
    )
}


export default Productdetails