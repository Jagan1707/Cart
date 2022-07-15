import React, {Component,useState,useEffect} from "react";
import axios from "axios";
import 'braintree-web';
import DropIn from "braintree-web-drop-in-react";
import {useLocation } from "react-router-dom";


const Payment=()=> {
    const { state } = useLocation();
    console.log("state",state)
    const [value,setvalue] = useState({
        clienttoken:null,
        success:'',
        error:'',
        instance:""
    })
    
    const {clienttoken,instance}=value
    console.log("value",value)
   const getClientToken=()=>{
        try {
            axios.get("http://localhost:8080/pay/tokengenete"
            ).then(data=>{
                console.log("token")
                console.log('data',data)
                console.log("msg",data.data.message,)
                setvalue({clienttoken:data.data.message})
            }).catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const saleTransaction=(data)=>{
        try {
            instance.requestPaymentMethod().then(nounceData=>{
                console.log(nounceData);
                if(nounceData){
                    console.log("data")
                    let data= {
                        amount: state,
                        paymentMethodNonce: nounceData.nonce
                    }
                    console.log('1',data.amount)
                    console.log("2",data.paymentMethodNonce)
                    axios.post("http://localhost:8080/pay/saleTransaction",data
                    ).then(resultData=>{
                        console.log("data",resultData.data);
                    }).catch((err)=>{
                        console.log(err.message)
                    })
                }
            })
        } catch (error) {
            console.log(error.message)
        }
        
    }
    useEffect(() => {
        getClientToken()
      }, []);
   return(
    <div>
    <h1>Payment Details</h1>
    {clienttoken && (
    <div>
    <DropIn
        options={{ authorization: clienttoken }}
        onInstance={(instance) =>setvalue ({ ...value,instance : instance})}
    />
    <button onClick={()=>saleTransaction()}>Buy</button>
    </div>
    )}
    {!clienttoken && <h1>Loading...</h1>}
</div>
   )
}


export default Payment;