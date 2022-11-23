import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'

export default function UpdateProduct() {
  
  let navigate = useNavigate()

  const {id} = useParams()

  const [product,setProduct] = useState({
    name:"",
    category:"",
    qty:"",
    price:""
  })

  const{name,category,qty,price} = product

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }


  useEffect(() => {
    loadProduct();
  }, [] );




  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:9092/products/update/${id}`, product)

    navigate("/")

  }

  // load data of that product
  const loadProduct = async () => {
    const result = await axios.get(`http://localhost:9092/products/${id}`)
    setProduct(result.data)
  }


  // reset the product filled
  const resetForm = () => {
    setProduct({
        name:"",
        category:"",
        qty:"",
        price:""
    })
  }



  return (
    <div className="container">
        
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

                <h2 className="text-center m-4">
                    Update Product
                </h2>

                <form
                    onSubmit={(e)=>onSubmit(e)}
                    onReset={()=>resetForm()}
                >


                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                       <b>Name</b> 
                    </label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder="Enter product name"
                        name="name"
                        value={name}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        <b>Category</b>
                    </label>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder="Enter category(s) (comma separated)"
                        name="category"
                        value={category}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="qty" className="form-label">
                       <b>Qty</b>
                    </label>
                    <input
                        type={"number"}
                        className="form-control"
                        placeholder="Enter quantity"
                        name="qty"
                        value={qty}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                       <b>Price</b>
                    </label>
                    <input
                        type={"number"}
                        step="0.01"
                        className="form-control"
                        placeholder="Enter price"
                        name="price"
                        value={price}
                        onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <button type="submit" className="btn btn-outline-primary">
                    Submit
                </button>
                
                <Link className="btn btn-outline-danger mx-2" to="/">
                    Cancel
                </Link>

                <button 
                    type="reset" 
                    className="btn btn-outline-warning"
                >
                    Reset
                </button>   


                </form>
            </div>

        </div>

    </div>
  )
}