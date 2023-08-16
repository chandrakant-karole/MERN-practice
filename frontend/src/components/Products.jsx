import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  // =============================== Search ==============================
  const SearchHandle = async ({ target: { value } }) => {
    // console.log(value);
    if (value) {
      let result = await fetch(`http://localhost:8000/search/${value}`, { method: "GET" })
      result = await result.json()
      setProductList(result)
    } else {
      getProducts()
    }
  }
  return (
    <>
      <h1>Products</h1>
      <input onChange={SearchHandle} className='search' type="text" placeholder='search...' />
      <table border={'1'}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Company</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        {ProductList.length > 0 ?
          ProductList.map(({ name, price, _id, company }, key) => {
            return <tbody key={_id}>
              <tr>
                <td>{key + 1}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{company}</td>
                <td><button onClick={() => removeProduct(_id)}>Delete</button></td>
                <td> <Link to={`/update/${_id}`}>Update</Link> </td>
              </tr>
            </tbody>
          }) :
          <>
            <tbody>
              <tr>
                <td colSpan={6} className='text-center'>
                  <h2>No Data Found</h2>
                </td>
              </tr>
            </tbody>
          </>
        }
      </table>
    </>
  )
}
