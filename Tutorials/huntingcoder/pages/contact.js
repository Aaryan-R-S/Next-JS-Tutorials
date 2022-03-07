import React, {useState} from 'react'
import styles from '../styles/Contact.module.css';

export default function Contact() {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [phone, setphone] = useState('')
  const [desc, setdesc] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name, phone, email, desc);
    const data = {name, email, phone, desc}
    fetch('http://localhost:3000/api/postcontact/', {
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body: JSON.stringify(data),
    }).then(response=>response.json())
    .then(data=>{
      console.log('Success:', data);
      alert("Thanks for contacting us!")
      setname('')
      setemail('')
      setphone('')
      setdesc('')
  })
    .catch(error=>{console.log('Error:', error);})

  }
  
  const handleChange = (e) => {
    if(e.target.name=='name'){
      setname(e.target.value)
    }
    if(e.target.name=='email'){
      setemail(e.target.value)
    }
    if(e.target.name=='phone'){
      setphone(e.target.value)
    }
    if(e.target.name=='desc'){
      setdesc(e.target.value)
    }
    e.preventDefault();
  }

  return (
    <div className={styles.container}>
      <h1>Contact us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="name" className={styles.formLabel}>Name</label>
          <input type="text" value={name} onChange={handleChange} name="name" className="form-control" id="name" aria-describedby="nameHelp"/>
        </div>
        <div className={styles.mb3}>
          <label htmlFor="email" className={styles.formLabel}>Email Address</label>
          <input type="email" value={email} onChange={handleChange} name="email" className="form-control" id="email" aria-describedby="emailHelp"/>
        </div>
        <div className={styles.mb3}>
          <label htmlFor="phone" className={styles.formLabel}>Phone</label>
          <input type="phone" value={phone} onChange={handleChange} className="form-control" name="phone" id="phone"/>
        </div>
        <div className={styles.mb3}>
          <label htmlFor="desc" className={styles.formLabel}>Your concern</label>
          <textarea className="form-control" value={desc} onChange={handleChange} name="desc" id="desc" placeholder='Write your text here' aria-describedby="descHelp"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
