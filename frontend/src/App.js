import logo from './logo.svg';
import './App.css';
import Register from './Component/Register/Sign-up'
import Login from './Component/Register/Login'
import Forget from './Component/Register/forgetPassword'
import Home from './Component/Com-1/Home'
import Product from './Component/Com-1/Products'
import Productdetails from './Component/Com-1/ProductDetails';
import Updateproduct from './Component/Com-1/update';
import { BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Dashbord from './Component/Com-1/Dashbord';
import Map from './Component/Com-1/Map';
import Cart from './Component/Com-1/Cart';
import Profile from './Component/Com-1/Profile';
import AddProduct from './Component/Com-1/AddProduct';
import Dome from './Component/Com-2/Dome'
import Upload from './Component/Com-2/uploade';
import Payment from './Component/Com-1/Payment';


function App() {
  return(
    <>
    <div className="App">

{/* <Dome/> */}
    
   
    <Router>
          <Routes>
        <Route path='/forget' element = {<Forget/>}/>
        <Route path='/signup' element = {<Register/>}/>
        <Route path='/' element = {<Login/>}/>
        <Route path='/home' element = {<Home/>} />
        <Route path='/product' element = {<Product/>} />
        <Route path='/viewProduct' element = {<Productdetails/>} />
        <Route path='/update' element = {<Updateproduct/>} />
        <Route path='/dash' element = {<Dashbord/>} />
        <Route path='/map' element = {<Map/>} />
        <Route path='/cart' element = {<Cart/>} />
        <Route path='/profile' element = {<Profile/>} />
        <Route path='/add' element = {<AddProduct/>} />
        <Route path='/pay' element = {<Payment/>} />
      </Routes>
    </Router>
    </div>
    </>
  )
}

export default App;
