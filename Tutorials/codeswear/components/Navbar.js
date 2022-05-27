import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle, AiOutlineShoppingCart } from 'react-icons/ai'
import styles from '../styles/navbar.module.css'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { MdAccountCircle } from 'react-icons/md'

const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [dropdown, setDropdown] = useState(false)
  const ref = useRef();
  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }
  return (
    <div className={`${styles.container} p-[6rem] pb-[1rem] pt-[1rem] md:text-xl flex flex-col md:flex-row  items-center shadow-xl top-0 sticky bg-white z-10`}>
      <div className="logo mr-auto md:mr-60">
        <Link href={'/'}><a><img src="http://localhost:3000/binary-code.png" alt="logo" className={styles.myImg} /></a></Link>
      </div>
      <div className="nav md:ml-96">
        <ul className='flex items-center space-x-5 font-bold'>
          <Link href={'/tshirts'}><a className='hover:text-green-600'><li>Tshirts</li></a></Link>
          <Link href={'/hoodies'}><a className='hover:text-green-600'><li>Hoodies</li></a></Link>
          <Link href={'/mugs'}><a className='hover:text-green-600'><li>Mugs</li></a></Link>
          <Link href={'/stickers'}><a className='hover:text-green-600'><li>Stickers</li></a></Link>
        </ul>
      </div>
      <div className={`${styles.cart} absolute right-12 top-8 font-bold cursor-pointer mx-5 flex`} >
        <span onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
        {dropdown && <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute md:top-8 top-4 md:right-12 right-8 bg-white shadow-lg rounded-md px-5 py-3 md:w-40 w-36">
          <ul>
            <Link href={'/myaccount'}><a><li className="py-1 hover:text-green-600">My Account</li></a></Link>
            <Link href={'/orders'}><a><li className="py-1 hover:text-green-600">Orders</li></a></Link>
            <li onClick={logout} className="py-1 hover:text-green-600">Logout</li>
          </ul>
        </div>}
        {user.value && <MdAccountCircle className='text-2xl md:text-4xl md:mr-6 mx-2' />}
        </span>
        {!user.value && <Link href={'/login'}><a>
          <button className='bg-green-600 rounded-md px-2 py-1 mr-4 md:text-md text-white'>Login</button>
        </a></Link>}
        <button className='font-bold'><AiOutlineShoppingCart onClick={toggleCart} className='text-2xl md:text-4xl' /></button>
      </div>
      <div ref={ref} className={`w-50 h-[100vh] overflow-y-scroll sidecart absolute top-0 right-0 bg-green-100 p-10 transform transition-transform ${Object.keys(cart).length == 0 ? "translate-x-full" : "translate-x-0"} z-10`}>
        <h2 className='font-bold text-xl text-center mb-5 underline'>Shopping Cart</h2>
        <span onClick={toggleCart} className='absolute top-5 right-2 cursor-pointer text-2xl text-green-800'><AiFillCloseCircle /></span>
        <ol className="list-decimal font-semibold ml-6">
          {Object.keys(cart).length == 0 && <div className='my-4 font-normal text-lg'>Your cart is empty!</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-2">
                <div className='w-2/3'>{cart[k].name} ({cart[k].size}/{cart[k].variant})</div>
                <div className='w-1/3 flex items-center justify-center'><AiFillMinusCircle onClick={() => { removeFromCart(k, 1) }} className="text-green-600 mx-1 text-2xl" /><span className="mx-1">{cart[k].quantity}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className="text-green-600 mx-1 text-2xl" /></div>
              </div>
            </li>
          })}
        </ol>
        <div className="total font-bold mx-3 mt-6">Subtotal: ₹{subTotal}</div>
        <div className="flex">
          <Link href={'/checkout'}><a><button className="flex mx-2 mt-6 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded md:text-lg text-base"><BsFillBagCheckFill className="mt-1 mr-2" /> Checkout</button></a></Link>
          <button onClick={clearCart} className="flex mx-2 mt-6 text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded md:text-lg text-base"> Clear Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar