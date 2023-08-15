import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
export default function UpdateProduct() {
    const { id } = useParams()
    const redirect = useNavigate()
    const [UserDetails, setUserDetails] = useState({})
    const [ProductDetails, setProductDetails] = useState({})

    const getProductDetails = async () => {
        const data = await fetch(`http://localhost:8000/product/${id}`, { method: "GET" })
        const { name, price, category, company } = await data.json()
        setProductDetails({ name, price, category, company })
    }

    useEffect(() => {
        getProductDetails()
    }, [])


    const UpdatePro = async () => {
        const updateData = {...ProductDetails,...UserDetails}
        const result = await fetch(`http://localhost:8000/product/${id}`, {
            method:"PUT",
            body: JSON.stringify(updateData),
            headers: {
                'content-Type': 'application/json'
            }
        })
        const data = await result.json()
        if(data){
            redirect('/')
        }
    }
    return (
        <>
            <div className='signUp'>
                <h1>UpdateProduct</h1>
                <input defaultValue={ProductDetails.name} type="text" onChange={({ target: { value, name } }) => setUserDetails((currentVal) => ({ ...currentVal, [name]: value }))} placeholder='Enter Name' name="name" id="name" />
                <input defaultValue={ProductDetails.price} type="text" onChange={({ target: { value, name } }) => setUserDetails((currentVal) => ({ ...currentVal, [name]: value }))} placeholder='Enter Price' name="price" id="price" />
                <input defaultValue={ProductDetails.category} type="text" onChange={({ target: { value, name } }) => setUserDetails((currentVal) => ({ ...currentVal, [name]: value }))} placeholder='Enter Category' name="category" id="category" />
                <input defaultValue={ProductDetails.company} type="text" onChange={({ target: { value, name } }) => setUserDetails((currentVal) => ({ ...currentVal, [name]: value }))} placeholder='Enter Company' name="company" id="company" />
                <button className='submit' onClick={UpdatePro}>Update Product</button>
            </div>
        </>
    )
}
