import React, { useEffect, useState } from 'react'
import axios from "axios";
import {Link, useParams, useNavigate} from 'react-router-dom'

export default function AdminHome() {

    let navigate = useNavigate()

    const [products, setProducts] = useState([]);

    const {id} = useParams()

    // load this everytime page loads (home page)
    useEffect(() => {
        loadProducts();
        // console.log("something written here...")
    
    }, []);

    // async and await because js runs line by line
    const loadProducts = async() => {
        try{
            const result = await axios.get("http://localhost:9092/products/")

        
            console.log("---------------------------->"+result.data+"<-----------------------------")
            if(result.data.length==0) alert("NO PRODUCTS FOUND !!!")
            setProducts(result.data);
    
        }

        catch(err){
            alert("NETWORK ERROR !!!")
        }
    };
    
    const deleteProduct = async (id) => {
        
        try{
            const result = await axios.delete(`http://localhost:9092/products/delete/${id}`)
    
            console.log(result);

            loadProducts()
        }
        catch(err){
            alert("Product with id : "+id+" not found !!")
        }

    }

    // setting variable
    const [filterbyid, setFilterbyid] = useState('')
    
    // setting the filter by id
    const onChangeFilterById = (e) => {
        setFilterbyid(e.target.value)
    }

    // on submit action
    const onSubmitFilterById = async (e) => {
        e.preventDefault()


        try{
            const result = await axios.get(`http://localhost:9092/products/${filterbyid}`)

            if(result.data.length==0)
                alert("Product with Id : "+filterbyid+" not found !!");

            else
                setProducts([result.data])
            
            document.getElementById('idfilter').value = ''
        }

        catch(err){
            alert("Due to some errors, this request cannot be fulfilled !!")
            document.getElementById('idfilter').value = ''
        } 
    }



  return (

    <div className='container'>
        <br></br>
        <div>
            <form onSubmit={(e)=>onSubmitFilterById(e)}>
                <input 
                    type="text" id="idfilter" name="idfilter"
                    placeholder="Enter product id"
                    style={{float:'left'}}
                    onChange={(e)=>onChangeFilterById(e)} required="true"
                />
                <br></br><br></br>
                <button type="submit" className="btn btn-primary" style={{float:'left'}}>Filter by Id</button>
            </form>

            <button 
                style={{float:'right'}}
                className="btn btn-primary my-2"
                onClick={()=> loadProducts()}
            >
                Show All Products
            </button>

        </div>
        

        <div className='py-4'>

        

        <table className="table border shadow">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>

                {
                    products.map((product,index)=>(
                        <tr>
                            <th scope="row" key={index}>
                                {index+1}
                            </th>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.qty}</td>
                            <td>{product.price}</td>
                            <td>
                                <Link 
                                    className="btn btn-primary mx-2"
                                    to={`/view-product/${product.id}`}
                                >
                                    View
                                </Link>
                                <Link 
                                    className="btn btn-outline-primary mx-2" 
                                    to={`/update-product/${product.id}`}
                                >
                                    Update
                                </Link>
                                <button 
                                    // className="btn btn-outline-danger mx-2"
                                    // onClick={()=>deleteProduct(product.id)}
                                    className='btn btn-outline-danger mx-2'
                                    onClick={() => { if (window.confirm('Are you sure you wish to delete this product???')) deleteProduct(product.id) } }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                }
                
            </tbody>
        </table>
        <Link 
            className="btn btn-success my-2" 
            to={"/add-product"}
        >
            ADD NEW PRODUCT
        </Link>
    </div>
    </div>
  )
}
