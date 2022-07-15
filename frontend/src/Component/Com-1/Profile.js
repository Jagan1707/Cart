import React, { useState } from "react";
import './profile.css';
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";
import swal from 'sweetalert';
import axios from "axios";
const Profile = () =>{
 const {state} = useLocation();
 const navigate = useNavigate()
 console.log('data',state.username)
 const[name,setname] = useState(state.username)
 const[role,setrole] = useState(state.role)
 const[mobile,setmobile] = useState(state.phone)
 const[email,setemail] = useState(state.email)
 const[address,setaddress] = useState(state.address)
 const [img,setimg] = useState('')

 const updateuser = () =>{

    let data ={
    uuid     : state.uuid,
    username : name,
    role     : role,
    phone    : mobile,
    email    : email,
    address  : address
    }

    axios.put('http://localhost:8080/user/updateuser',data).then(result=>{
        console.log('update',result.data)
        if(result.data.status == 'success'){
            swal({
                title: "UPDATED SUCCESS!",
                text: state.username,
                icon: "success",
                button: "OK",
              });
        }
    }).catch(err=>{
        console.log('err',err.message)
    })
 }

 const signout = () =>{
    let uuid = state.uuid
    axios.post(`http://localhost:8080/user/Logout?uuid=${uuid}`).then(result=>{
        console.log('result',result.data.status)
        if(result.data.status == "success"){
            swal({
                title: "LOGOUT SUCCESS!",
                text: "THANKS",
                icon: "success",
                button: "OK",
              });
              navigate('/signup')
        }  
    }).catch(err=>{
        console.log('err',err.message)
        swal("userName and password is Wrong!");

    })
}

    
 

console.log('img',img)








    return(
        <>
        <div className="containe">
        <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
                <div className="container-fluid">
                    <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                <form class="d-flex" role="search">
                  <input class="form-control me-1 search" type="search" placeholder="What are You looking for" aria-label="Search" onChange={(p)=>(p.target.value)}/>
                   <button class=" btn2" type="button" onClick={''}>&#128269;</button>   
                </form>
                <div className="cursor">
                       <span className="navclick" onClick={''}>product</span>
                       <Link to = {'/map'} className = 'navbar-brand'>
                        Track Order
                        </Link> 
                       <span className="navclick" onClick={''}>Cart</span>
                        </div>
                        <div className="drobdown">
                        <div className="profile ">
                        <h5>{localStorage.getItem('name')}</h5>
                        <div className="drob-con">
                        <p onClick={()=>  window.location.href = '/' }>Sigin-in</p>
                        <p onClick={()=>  window.location.href = '/signup' }>Sigin-up</p>
                        <p onClick={''}>Log-out</p>
                        </div>
                        </div></div>
                </div>    
            </nav>
            <div className="profile-back">
            <div className="pro">
                <div className="profile-left">
                    {
                    img == '' ?
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                    : <img src={img}></img>
                    }
                   <h4>{localStorage.getItem('name')}</h4>
                   <span>Id : {localStorage.getItem('id')}</span><br></br>
                   <span>Role :  {localStorage.getItem('role')}</span><br></br>
                   {/* <button type="button">My Orders</button> */}
                   <input type='file' onChange={(p)=>setimg(URL.createObjectURL(p.target.files[0]))}/>
                </div>
                <div className="profile-right">
                  <form>
                <div class="form-group row">
                <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Name</label>
                <div class="col-sm-10">
                <input type="email" class="form-control form-control-lg" id="colFormLabelLg" placeholder="name" value={name}  onChange={(p)=>setname(p.target.value)} />
                </div>
                </div>
                <div class="form-group row">
                <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Role</label>
                <div class="col-sm-10">
                <input type="email" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Role" value={role} onChange={(p)=>setrole(p.target.value)} />
                </div>
                </div>
                <div class="form-group row">
                <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Mobile</label>
                <div class="col-sm-10">
                <input type="email" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Mobile" value={mobile} onChange={(p)=>setmobile(p.target.value)} />
                </div>
                </div>
                <div class="form-group row">
                <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg" >Email</label>
                <div class="col-sm-10">
                <input type="email" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Email" value={email} onChange={(p)=>setemail(p.target.value)}/>
                </div>
                </div>
                <div class="form-group row">
                <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Address</label>
                <div class="col-sm-10">
                <input type="email" class="form-control form-control-lg" id="colFormLabelLg" placeholder="Address" value={address} onChange={(p)=>setaddress(p.target.value)} />
                </div>
                </div>
                  </form>
                    <button type="button" onClick={updateuser} >Edit</button>
                </div>
            </div>
            <div className="pro">
            <div className="profile-left">
                <ul>
                    <li>My Coupons</li>
                    <li>All Notifications</li>
                    <li>My Reviews & Rating</li>
                    <li>My Wishlist</li>
                </ul>
                <button type="button" onClick={signout}>Log out</button>
            </div>
            <div className="profile-right">
                <h5>FAQs</h5>
                <ul>
                    <b><li>
                    What happens when I update my email address (or mobile number)?
                    </li></b>
                    <li>
                    Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).
                    </li>
                    <b><li>When will my Flipkart account be updated with the new email address (or mobile number)?</li></b>
                    <li>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</li>
                    <b><li>Does my Seller account get affected when I update my email address?</li></b>
                    <li>lenskart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</li>
                </ul>
            </div>
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
        </div>
        </>
    )
}

export default Profile