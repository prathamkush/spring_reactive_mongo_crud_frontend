import React, { useEffect, useState } from 'react'
import {Link, useParams} from "react-router-dom"
import axios from "axios"

export default function ViewProduct() {
    
    const [product, setProduct] = useState({
        name:"",
        category:"",
        qty:"",
        price:""
    })

    const {id} = useParams()

    useEffect(() => {
        loadProduct()
    }, {})

    // load data of that product
    const loadProduct = async () => {
        const result = await axios.get(`http://localhost:9092/products/${id}`)
        setProduct(result.data)
    }



  return (
    <div className="container">
        
        <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

                <h2 className="text-center m-4">
                    Product Details
                </h2>

                <div className="card">
                    <div className="card-header">
                       <b> Product id : </b> {id}
                        <ul className="list-group list-group-flush">

                            <li className="list-group-item">
                                <b>Name : </b> {product.name}
                            </li>

                            <li className="list-group-item">
                                <b>Category : </b> {product.category}
                            </li>

                            <li className="list-group-item">
                                <b>Quantity : </b> {product.qty}
                            </li>

                            <li className="list-group-item">
                                <b>Price : </b> {product.price}
                            </li>

                        </ul>
                    </div>

                </div>


                <Link className="btn btn-primary my-2" to={"/"}>
                    Back to Home
                </Link>


            </div>
        </div>
    </div>
  )
}
