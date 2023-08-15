import React, { useState } from 'react'

export default function AddProduct() {
  const [UserDetails, setUserDetails] = useState({})
  const AddPro = async () => {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const ProductData = { ...UserDetails, "userId": userId }
    let result = await fetch('http://localhost:8000/add-product', {
      method: "POST",
      body: JSON.stringify(ProductData),
      headers: {
        'content-Type': 'application/json'
      }
    })

    result = await result.json()
    console.log({ "add product": result });
  }

  return (
    <>
      <div className='signUp'>
        <h1>AddProduct</h1>
        <input type="text" onChange={({ target: { value, name } }) => setUserDetails((currentVal) => ({ ...currentVal, [name]: value }))} placeholder='Enter Name' name="name" id="name" />
        <input type="text" onChange={({ target: { value, name } }) => setUserDetails((currentVal) => ({ ...currentVal, [name]: value }))} placeholder='Enter Price' name="price" id="price" />
        <input type="text" onChange={({ target: { value, name } }) => setUserDetails((currentVal) => ({ ...currentVal, [name]: value }))} placeholder='Enter Category' name="category" id="category" />
        <input type="text" onChange={({ target: { value, name } }) => setUserDetails((currentVal) => ({ ...currentVal, [name]: value }))} placeholder='Enter Company' name="company" id="company" />
        <button className='submit' onClick={AddPro}>Add Product</button>
      </div>
    </>
  )
}
