import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function Home() {


    const [products, setProducts] = useState([]);

    // load this everytime page loads (home page)
    useEffect(() => {
        loadProducts()
        // console.log("something written here...")
    
    }, []);


    const areProductsPresent = true;
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

    const loadProductsTemp = async() => {

        try{
            const result = await axios.get("http://localhost:9092/products/");
            // console.log(result.data)
            
            if(result.data.length==0) alert("NO PRODUCTS FOUND !!!")
            setProducts(result.data);
        }
        catch(err){
            alert("Due to some errors, this request cannot be fulfilled !!")
        }
    };


    


     //------------------------------//
    

    //getbyname
    const [filtername, setFiltername] = useState('')

    //onfilterchangename
    const onFilterNameChange = (e) => {
        setFiltername(e.target.value)
    }

    const onSubmitFilterName = async (e) => {
        //to prevent variables to show in url path
        e.preventDefault()

        //Regex for allowing alphanumeric,-,_ and space
        const alphaNumeric = "^[A-Za-z0-9? ,_-]+$";
        if ((filtername).search(alphaNumeric)) 
            alert("Only alphanumeric, -, _ and space are allowed");
        

        else{

            try{
                const result = await axios.get(`http://localhost:9092/products/getProductByName/${filtername}`)

                if(result.data.length==0)
                    alert("product(s) with name : "+filtername+ " not found")
                
                else
                    setProducts(result.data)    
                    // console.log(result.data)
            }

            catch(err){
                alert("Due to some errors, this request cannot be fulfilled !!")
            }   

            
        }

        document.getElementById('namefilter').value = ''

    }
    
    //------------------------------//

    

    //getbycategory
    const [filtercategory, setFiltercategory] = useState('')

    //onfilterchangecategory
    const onFilterCategoryChange = (e) => {
        setFiltercategory(e.target.value)
    }

    const onSubmitFilterCategory = async (e) => {
        //to prevent variables to show in url path
        e.preventDefault()

        //Regex for allowing alphanumeric,-,_ and space
        const alphaNumeric = "^[A-Za-z0-9? ,_-]+$";
        if ((filtercategory).search(alphaNumeric)) 
            alert("Only alphanumeric, -, _ and space are allowed");
        
        else{

            try{
                const result = await axios.get(`http://localhost:9092/products/getProductByCategory/${filtercategory}`)

                if(result.data.length==0) alert("product(s) having category(s) : "+filtercategory+ " not found");
        
                else{
                    // console.log(result.data)
                    setProducts(result.data)
                }
            }

            catch(err){
                alert("Due to some errors, this request cannot be fulfilled !!")
            } 
           
        }
       
        document.getElementById('categoryfilter').value = ''
    }


    //------------------------------//

 

    //getbypricerange
    const [filterminprice, setFilterminprice] = useState('')
    const [filtermaxprice, setFiltermaxprice] = useState('')

    // setting the min and max prices
    const onFilterPriceChange1 = (e) => {
        setFilterminprice(e.target.value)
    }
    const onFilterPriceChange2 = (e) => {
        setFiltermaxprice(e.target.value)
    }

    const onSubmitFilterPriceRange = async (e) => {
        e.preventDefault()

        if(filterminprice>filtermaxprice) alert("Minimum price should be less than Maximum price !!")

        else{

            try{
                const result = await axios.get(`http://localhost:9092/products/product-in-range/${filterminprice}/${filtermaxprice}`)

                if(result.data.length===0)
                    alert("product(s) in price range "+filterminprice+"-"+filtermaxprice+ " not found");
    
                else
                    setProducts(result.data)
            }

            catch(err){
                alert("Due to some errors, this request cannot be fulfilled !!")
            } 

           
        }

        document.getElementById('minpricefilter').value = ''
        document.getElementById('maxpricefilter').value = ''
        
    }


    //------------------------------//

    

  return (
    <div className='container'>

        

        <div className='py-4'>
            <h3><b>PRODUCTS</b>     </h3>


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

        {/* //------------------------------// */}

        <button 
            className="btn btn-primary my-2"
            onClick={()=> loadProductsTemp()}
        >
            Reset Filters
        </button>
        

        {/* //------------------------------// */}



        <br></br><br></br><br></br>

        

        <div className="container">
        
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

                    <h2 className="text-center m-4">
                        Filters : 
                    </h2>

                    <div className="card">
                        <div className="card-header">

                            <ul className="list-group list-group-flush">

                                <li className="list-group-item">
                                    <b>By Name : </b> 

                                    <form onSubmit={e=>onSubmitFilterName(e)}>
                                        <div className="mb-3">
                                            <label for="name" className="form-label"></label>
                                            <input 
                                                type="text" className="form-control" id="namefilter" name="namefilter" defaultValue={filtername}
                                                placeholder="Enter Name"
                                                onChange={(e)=>onFilterNameChange(e)} required="true"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Filter</button>
                                    </form>

                                    <br></br>
                                </li>

                                <li className="list-group-item">
                                    <b>By Category : </b> 

                                    <form onSubmit={e=>onSubmitFilterCategory(e)}>
                                        <div className="mb-3">
                                            <label for="name" className="form-label"></label>
                                            <input 
                                                type="text" className="form-control" id="categoryfilter" name="categoryfilter" defaultValue={filtercategory}
                                                placeholder="Enter any category or matching letters"
                                                onChange={(e)=>onFilterCategoryChange(e)} required="true"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Filter</button>
                                    </form>

                                    <br></br>
                                </li>

                                <li className="list-group-item">
                                    <b>By Price Range : </b> 

                                    <form onSubmit={e=>onSubmitFilterPriceRange(e)}>
                                        <div className="mb-3">
                                            <label for="name" className="form-label"></label>
                                            
                                            <input 
                                                type="number" step="0.01" className="form-control" id="minpricefilter" name="minpricefilter" defaultValue={filterminprice}
                                                placeholder="Enter minimum price"
                                                min="0"
                                                onChange={(e)=>onFilterPriceChange1(e)} required="true"
                                            />
                                            <input 
                                                type="number" step="0.01" className="form-control" id="maxpricefilter" name="maxpricefilter" defaultValue={filtermaxprice}
                                                placeholder="Enter maximum price"
                                                min="0"
                                                onChange={(e)=>onFilterPriceChange2(e)} required="true"
                                            />

                                        </div>
                                        <button type="submit" className="btn btn-primary">Filter</button>
                                    </form>

                                    <br></br>
                                </li>


                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    </div>
    </div>
  )
}
