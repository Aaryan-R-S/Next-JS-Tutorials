import React from 'react'
import {AiFillMinusCircle, AiFillPlusCircle} from 'react-icons/ai'
import {BsFillBagCheckFill} from 'react-icons/bs'
import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'

const Checkout = ({cart, clearCart, addToCart, removeFromCart, subTotal}) => {
  const initiatePayment = async()=>{
    let oid = Math.floor(Math.random()*Date.now())
    // Get a transaction token
    const data = {cart, subTotal, oid, email:"email"};
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    })
    let txnRes = await a.json()
    let txnToken = txnRes.txnToken
    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
      "orderId": oid, /* update order id */
      "token": txnToken, /* update token value */
      "tokenType": "TXN_TOKEN",
      "amount": subTotal /* update amount */
      },
      "handler": {
        "notifyMerchant": function(eventName,data){
          console.log("notifyMerchant handler function called");
          console.log("eventName => ",eventName);
          console.log("data => ",data);
        } 
      }
    };

    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error){
        console.log("error => ",error);
    });

  }
  return (
    <div className='container m-auto p-5 mt-10'>
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head>
      <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}> </Script>
      <h1 className='font-bold text-3xl text-center mb-5'>Checkout</h1>
      <h2 className='font-semibold text-xl mb-2'>1. Delivery Details</h2>

      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-base text-gray-900">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-base text-gray-900">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
      </div>
      
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-base text-gray-900">Address</label>
          <textarea id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" cols="30" rows="2"></textarea>
        </div>
      </div>

      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-base text-gray-900">Phone</label>
            <input type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-base text-gray-900">City</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-base text-gray-900">State</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pincode" className="leading-7 text-base text-gray-900">Pincode</label>
            <input type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
      </div>

      <h2 className='font-semibold text-xl mt-2 mb-2'>2. Review Cart Items and Pay</h2>
      <div className="w-200 sidecart bg-green-100 p-6 m-4">
        <ol className="list-decimal font-semibold ml-6">
          {Object.keys(cart).length==0 && <div className='my-4 font-normal text-lg'>Your cart is empty!</div>}
         {Object.keys(cart).map((k)=>{return <li key={k}>
            <div className="item flex my-2">
              <div className='font-semibold'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
              <div className='w-1/3 flex items-center justify-center'><AiFillMinusCircle onClick={()=>{removeFromCart(k, 1)}} className="text-green-600 mx-1 text-2xl"/><span className="mx-1">{cart[k].quantity}</span><AiFillPlusCircle onClick={()=>{addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}} className="text-green-600 mx-1 text-2xl"/></div>
            </div>
          </li>})}
        </ol>
        <div className="total font-bold mx-3">Subtotal: ₹{subTotal}</div>
        <Link href={'/checkout'}><a><button onClick={initiatePayment} className="flex mx-2 mt-8 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded md:text-lg text-base"><BsFillBagCheckFill className="mt-1 mr-2"/> Pay ₹{subTotal}</button></a></Link>
      </div>
    </div>
  )
}

export default Checkout