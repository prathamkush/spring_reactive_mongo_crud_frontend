import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams} from "react-router-dom"
import axios from "axios"

export default function ViewProduct() {

    let navigate = useNavigate()
    
    


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
        try{
            const result = await axios.get(`http://localhost:9092/products/${id}`)
            setProduct(result.data)
        }

        catch(err){
            alert("Due to some errors, product can't be viewed !!")
            navigate("/admin-home")            
        }
       
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


                <Link className="btn btn-primary my-2" 
                    to={"/admin-home"}
                    
                >
                    Back to Home
                </Link>
                {/* <button className="btn btn-primary my-2" onClick={() => navigate(-1)}>Back to Home</button> */}


            </div>
        </div>
    </div>
  )
}
