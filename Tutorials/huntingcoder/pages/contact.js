import React, { useState } from 'react'
import styles from '../styles/Contact.module.css';

export default function Contact() {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [desc, setdesc] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name, phone, email, desc);
    const data = { name, email, phone, desc }
    fetch('http://localhost:3000/api/postcontact/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
      .then(data => {
        // console.log('Success:', data);
        alert("Thanks for contacting us!")
        setname('')
        setemail('')
        setphone('')
        setdesc('')
      })
      .catch(error => { console.error('Error:', error); })

  }

  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setname(e.target.value)
    }
    if (e.target.name == 'email') {
      setemail(e.target.value)
    }
    if (e.target.name == 'phone') {
      setphone(e.target.value)
    }
    if (e.target.name == 'desc') {
      setdesc(e.target.value)
    }
    e.preventDefault();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Contact us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.formLabel}>Name</label>
          <input className={styles.input} type="text" value={name} onChange={handleChange} name="name" id="name" aria-describedby="nameHelp" required={true} />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.formLabel}>Email Address</label>
          <input className={styles.input} type="email" value={email} onChange={handleChange} name="email" id="email" aria-describedby="emailHelp" required={true} />
          We will never share your email with anyone else!
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.formLabel}>Phone</label>
          <input className={styles.input} type="phone" value={phone} onChange={handleChange} name="phone" id="phone" required={true} />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="desc" className={styles.formLabel}>Your concern</label>
          <textarea className={styles.input} value={desc} onChange={handleChange} name="desc" id="desc" required={true} />
        </div>
        <button type="submit" className={styles.btn}>Submit</button>
      </form>
    </div>
  )
}
