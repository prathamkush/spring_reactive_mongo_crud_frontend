import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function Home() {

    const [products, setProducts] = useState([]);


    // load this everytime page loads (home page)
    useEffect(() => {
        loadProducts();
        // console.log("something written here...")
    
    }, []);

    // async and await because js runs line by line
    const loadProducts = async() => {
        const result = await axios.get("http://localhost:9092/products/");
        // console.log(result.data)
        setProducts(result.data);
    };
    
   


  return (
    <div className='container'>

        <div className='py-4'>
        <table className="table border shadow">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>

                {
                    products.map((product,index)=>(
                        <tr>
                            <th scope="row" key={index}>
                                {index+1}
                            </th>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.qty}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))
                }
                
            </tbody>
        </table>
    </div>
    </div>
  )
}
