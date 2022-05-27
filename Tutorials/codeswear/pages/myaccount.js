import React,  {useEffect} from 'react'
import { router, useRouter } from 'next/router'

export default function MyAccount() {
  const router = useRouter()
  useEffect(() => {
    if(!localStorage.getItem('token')){
      router.push('/')
    }
  }, [router.query])
  
  return (
    <div>MyAccount</div>
  )
}
