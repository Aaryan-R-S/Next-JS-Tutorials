import React, { useRef } from 'react'
import Link from 'next/link'
import {AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle, AiOutlineShoppingCart} from 'react-icons/ai'
import styles from '../styles/navbar.module.css'
import {BsFillBagCheckFill} from 'react-icons/bs'

const Navbar = ({cart, addToCart, removeFromCart, clearCart, subTotal}) => {

  const ref = useRef();
  const toggleCart = ()=>{
    if(ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if(!ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }
  return (
    <div className={`${styles.container} md:text-xl flex flex-col md:flex-row justify-center md:justify-between items-center shadow-xl`}>
      <div className="logo">
        <Link href={'/'}><a><img src="binary-code.png" alt="logo" className={styles.myImg} /></a></Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-5 font-bold'>
          <Link href={'/tshirts'}><a><li>Tshirts</li></a></Link>
          <Link href={'/hoodies'}><a><li>Hoodies</li></a></Link>
          <Link href={'/mugs'}><a><li>Mugs</li></a></Link>
          <Link href={'/stickers'}><a><li>Stickers</li></a></Link>
        </ul>
      </div>
      <div className={`${styles.cart} font-bold cursor-pointer`} onClick={toggleCart} >
        <button className='font-bold'><AiOutlineShoppingCart className='text-2xl md:text-4xl'/></button>
      </div>
      <div ref={ref} className="w-200 h-full sidecart absolute top-0 right-0 bg-green-100 p-10 transform transition-transform translate-x-full z-10">
        <h2 className='font-bold text-xl text-center mb-5 underline'>Shopping Cart</h2>
        <span onClick={toggleCart} className='absolute top-5 right-2 cursor-pointer text-2xl text-green-800'><AiFillCloseCircle/></span>
        <ol className="list-decimal font-semibold ml-6">
          {Object.keys(cart).length==0 && <div className='my-4 font-normal text-lg'>Your cart is empty!</div>}
         {Object.keys(cart).map((k)=>{return <li key={k}>
            <div className="item flex my-2">
              <div className='w-2/3'>{cart[k].name}</div>
              <div className='w-1/3 flex items-center justify-center'><AiFillMinusCircle onClick={()=>{removeFromCart(k, 1)}} className="text-green-600 mx-1 text-2xl"/><span className="mx-1">{cart[k].quantity}</span><AiFillPlusCircle onClick={()=>{addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)}} className="text-green-600 mx-1 text-2xl"/></div>
            </div>
          </li>})}
        </ol>
        <div className="flex">
          <button className="flex mx-2 mt-8 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded md:text-lg text-base"><BsFillBagCheckFill className="mt-1 mr-2"/> Checkout</button>
          <button onClick={clearCart} className="flex mx-2 mt-8 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded md:text-lg text-base"> Clear Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar