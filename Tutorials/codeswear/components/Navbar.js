import React from 'react'
import Link from 'next/link'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import styles from '../styles/navbar.module.css'

const Navbar = () => {
  return (
    <div className={`${styles.container} md:text-xl flex flex-col md:flex-row justify-center md:justify-between items-center`}>
      <div className="logo">
        <img src="binary-code.png" alt="logo" className={styles.myImg} />
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-5 font-bold'>
          <Link href={'/'}><a><li>Tshirts</li></a></Link>
          <Link href={'/'}><a><li>Hoodies</li></a></Link>
          <Link href={'/'}><a><li>Mugs</li></a></Link>
          <Link href={'/'}><a><li>Stickers</li></a></Link>
        </ul>
      </div>
      <div className={`${styles.cart} font-bold`}>
        <button className='font-bold'><AiOutlineShoppingCart className='text-2xl md:text-4xl'/></button>
      </div>
    </div>
  )
}

export default Navbar