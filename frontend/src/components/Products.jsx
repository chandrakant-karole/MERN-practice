import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
export default function Products() {
  const [ProductList, setProductList] = useState([])
  const getProducts = async () => {
    let data = await fetch('http://localhost:8000/product-list', { method: "GET" })
    let result = await data.json()
    setProductList(result)
  }
  useEffect(() => {
    getProducts()
  }, [])

  // ============================= Delete =========================
  const removeProduct = async (id) => {
    let result = await fetch(`http://localhost:8000/delete/${id}`, {
      method: "DELETE"
    })
    result = await result.json()
    if (result) {
      alert('Product deleted')
      getProducts()
    }
  }

  return (
    <>
      <h1>Products</h1>
      <table border={'1'}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Company</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        {ProductList.map(({ name, price, _id, company }) => {
          return <tbody key={_id}>
            <tr>
              <td>{name}</td>
              <td>{price}</td>
              <td>{company}</td>
              <td><button onClick={() => removeProduct(_id)}>Delete</button></td>
              <td> <Link to={`/update/${_id}`}>Update</Link> </td>
            </tr>
          </tbody>
        })}
      </table>
    </>
  )
}
