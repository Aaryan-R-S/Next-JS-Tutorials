import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter()
  useEffect(() => {
    try{
        if(localStorage.getItem("cart")){
          setCart(JSON.parse(localStorage.getItem("cart")))
          saveCart(JSON.parse(localStorage.getItem("cart")))
        }
      }
      catch(error){
        console.log(error);
        localStorage.removeItem("cart")
      }
  }, [])
  
  const saveCart = (myCart)=>{
    localStorage.setItem("cart", JSON.stringify(myCart));
    let sum = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
        sum += myCart[keys[i]].price * myCart[keys[i]].quantity      
    }
    setSubTotal(sum);
  }

  const addToCart = (itemCode, quantity, price, name, size, variant)=>{
    let myCart = cart;
    if(itemCode in cart){
      myCart[itemCode].quantity = cart[itemCode].quantity + quantity;
    }
    else{
      myCart[itemCode] = {quantity, price, name, size, variant};
    }
    setCart(myCart);
    saveCart(myCart);
  }
  
  const clearCart = ()=>{
    setCart({})
    // saveCart(cart) is not good as it may be possible that previous instruction of clearing cart is not completed
    saveCart({})
  }
  
  const removeFromCart = (itemCode, quantity)=>{
    let myCart = cart;
    if(itemCode in cart){
      myCart[itemCode].quantity = cart[itemCode].quantity - quantity;
    }
    if(myCart[itemCode].quantity<=0){
      delete myCart[itemCode];
    }
    setCart(myCart);
    saveCart(myCart);
  }

  const buyNow = (itemCode, quantity, price, name, size, variant)=>{
    let newCart = {itemCode: {quantity:1, price, name, size, variant}};
    setCart(newCart);
    saveCart(newCart)
    router.push('/checkout')
  }

  return <>
    <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal}/>
    <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
    <Footer/>
  </>
}

export default MyApp
