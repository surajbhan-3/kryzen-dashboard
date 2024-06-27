import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import Card from '../Component/Card'
import apiService from '../Config/apiServices'
import {useNavigate} from 'react-router'
import Loading from '../Component/Loading'
import { useAuth } from '../Context/AuthContext'

function Home() {
  const [data, setData] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate()
  const {setUserName} = useAuth()
  const user= localStorage.getItem('user')

  const cleanUser = user.replace(/"/g, '');
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setUserName(user)
     const getAllProducts  = async()=>{
      setLoading(true)
    try {
      const response = await apiService.get(`/${cleanUser}/all_product`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
      
      if(response.data.result===true){
     
          setData(response.data.data)
           setLoading(false)
        // setFilteredProducts(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
     }

     getAllProducts()

  },[user])


const handleClick = async()=>{

  navigate(`/${cleanUser}/add_product`)

}

useEffect(() => {
  filterProducts();
}, [type,minPrice,maxPrice]);

useEffect(() => {
  sortProducts();
}, [sortOrder]);

const filterProducts = () => {
 

  let result = data;

  if (type && type !== 'all') {
    result = result.filter(product => product.type === type);
  }else if(type === 'all'){
    setFilteredProducts(data)
  }

  if (minPrice) {
    result = result.filter(product => product.price >= parseInt(minPrice));
  }

  if (maxPrice) {
    result = result.filter(product => product.price <= parseInt(maxPrice));
  }

  setFilteredProducts(result);


};

const sortProducts = () => {
  let sorted = [...filteredProducts];
  sorted.sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  setFilteredProducts(sorted);
};


const handleDelete = async(p_id,title)=>{
  const response = await apiService.delete(`/${cleanUser}/delete_product/${p_id}/${title}`)
  if(response.status === 204){
    const filterData = data.filter((el)=>{
        if(el.id !== p_id){
          return el;
        }
       
    })
    setFilteredProducts(filterData)
  }
}

const handleDefaultClick = () =>{
     alert('These are default products. Add products please')
}



const disableButtons = true;
  return (
    <div className='container-m'>

        <Navbar />
          
      <div className="home-main-wrapper">
        <aside className='home-aside'>
            <div className='home-aside-top-div'>
            <div className='product-filter-sort'>
     
     <h3>Filter Products</h3>
     <div className='filter-div'>
       <label>Select Category:</label>
       <select value={type} onChange={e => setType(e.target.value)}>
         <option value='all'>All</option>
         <option value='electronics'>Electronics</option>
         <option value='clothing'>Clothing</option>
         <option value="books">Books</option>
       </select>
     </div>
     <div className='filter-div'>
       <label>Min Price:</label>
       <input
         type='number'
         value={minPrice}
         onChange={e => setMinPrice(e.target.value)}
       />
     </div>
     <div className='filter-div'>
       <label>Max Price:</label>
       <input
         type='number'
         value={maxPrice}
         onChange={e => setMaxPrice(e.target.value)}
       />
     </div>
     <div className='sort-section'>
     <h3>Sort Products</h3>
     <div className='filter-div'>
       <label>Sort by Time Created:</label>
       <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
         <option value='asc'>Ascending</option>
         <option value='desc'>Descending</option>
       </select>
     </div>
   </div>

 
 </div>

            </div>
        

        </aside>
      {
        loading?(<React.Fragment><Loading /></React.Fragment>):( <div className="home-main-container">
          {
           (data.length!==0)? (
             <React.Fragment>
 
 <div className="h-top-bar">
               <div className='dp-mp'>
                   <div className='dp'><h2>Products List</h2></div>
                   <div><button onClick={handleClick} id='mp'>{<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>} Add Products</button></div>
               </div>
           </div>
 
           <div className="card-wrapper"  >
           {filteredProducts.length ? filteredProducts.map((el) => (
            <div  key={el.id}>
               <Card
                 product_id={el.id}
                 imageUrl={el.image}
                 title={el.name}
                 description={el.description}
                 price={el.price}
                 productDelete = {handleDelete}
                
               />
               </div>
             )) : data.map((el) => (
              <div  key={el.id}>
               <Card
                 product_id={el.id}
                 imageUrl={el.image}
                 title={el.name}
                 description={el.description}
                 price={el.price}
                 productDelete = {handleDelete}
                
               />
               </div>
             ))}
                            
           </div>
             </React.Fragment>
           ): (
             <React.Fragment>
 
 <div className="h-top-bar">
               <div className='dp-mp'>
                   <div className='dp'>Default Products</div>
                   <div><button id='mp' onClick={handleClick}  > {<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>} Add Products</button></div>
               </div>
           </div>
 
           <div className="card-wrapper"  onClick = {handleDefaultClick}>
                               <Card
                                  
                                   imageUrl="https://www.boat-lifestyle.com/cdn/shop/products/02-3_700x.jpg?v=1656101712"
                                   title="Rockerz 450 DC"
                                   description="Wireless Bluetooth Headphone with 40mm Dynamic Drivers, Upto 15 Hours Playback, Adaptive Headband"
                                   price="1250"
                                   disableButtons={disableButtons}
                                 />
                               <Card
                                   imageUrl="https://www.boat-lifestyle.com/cdn/shop/products/02-3_700x.jpg?v=1656101712"
                                   title="Rockerz 450 DC"
                                   description="Wireless Bluetooth Headphone with 40mm Dynamic Drivers, Upto 15 Hours Playback, Adaptive Headband"
                                   price="1250"
                                   disableButtons={disableButtons}
                                 />
                               <Card
                                   imageUrl="https://www.boat-lifestyle.com/cdn/shop/products/02-3_700x.jpg?v=1656101712"
                                   title="Rockerz 450 DC"
                                   description="Wireless Bluetooth Headphone with 40mm Dynamic Drivers, Upto 15 Hours Playback, Adaptive Headband"
                                   price="1250"
                                   disableButtons={disableButtons}
                                 />
           </div>
 
           <div>
             <div className='yp' >Your Products</div>
                <div className='yp-inner'>
                No Products  available Please add products 
                </div>
           </div>
             </React.Fragment>
           )
          }
                 
                 
         </div>)
      }

      </div>
    </div>
  )
}

export default Home