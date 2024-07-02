import React, { useEffect, useState } from 'react'
import Navbar from '../Component/Navbar'
import Card from '../Component/Card'
import apiService from '../Config/apiServices'
import { useNavigate } from 'react-router'
import Loading from '../Component/Loading'
import { useAuth } from '../Context/AuthContext'
import DefaultCard from '../Component/DefaultCard'
import { IoBagAddOutline } from "react-icons/io5";
import FilterProduct from '../Component/FilterProduct'
import SortProduct from '../Component/SortProduct'



function Home() {


  const [data, setData] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate()
  const { setUserName } = useAuth()
  const user = localStorage.getItem('user')



  const cleanUser = user.replace(/"/g, '');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setUserName(user)
    const getAllProducts = async () => {
      setLoading(true)
      try {
        const response = await apiService.get(`/${cleanUser}/all_product`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        })

        if (response.data.result === true) {

          setData(response.data.data)
          setLoading(false)
          // setFilteredProducts(response.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getAllProducts()

  }, [user])


  const handleClick = async () => {

    navigate(`/${cleanUser}/add_product`)

  }

  useEffect(() => {
    filterProducts();
  }, [type, minPrice, maxPrice]);

  useEffect(() => {
    sortProducts();
  }, [sortOrder]);

  const filterProducts = () => {


    let result = data;

    if (type && type !== 'all') {
      result = result.filter(product => product.type === type);
    } else if (type === 'all') {
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
   
    if(sorted.length>0){
      sorted.sort((a, b) => {
        if (sortOrder === 'asc') {
          return new Date(a.date) - new Date(b.date);
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      });
  
      setFilteredProducts(sorted);
    }else{
      data.sort((a, b) => {
        if (sortOrder === 'asc') {
          return new Date(a.date) - new Date(b.date);
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      });
  
      setFilteredProducts(data);
    }
  };


  const handleDelete = async (p_id) => {
    setLoading(true)
    const response = await apiService.delete(`/${cleanUser}/delete_product/${p_id}`)
    if (response.status === 204) {
      console.log(response, "fsdafsd")
      const filterData = data.filter((el) => {
        if (el.id !== p_id) {
          return el;
        }

      })
      setFilteredProducts(filterData)
      setLoading(false)
    }
  }



  return (
    <div className='container-m'>

      <Navbar />

      <div className="home-main-wrapper">
        <aside className='home-aside'>
          <div className='home-aside-top-div'>
            <div className='product-filter-sort'>

              <h3>Filter Products</h3>

              <FilterProduct
                type={type}
                setType={setType}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}

              />

              <SortProduct

                sortOrder={sortOrder}
                setSortOrder={setSortOrder}

              />


            </div>

          </div>


        </aside>
        {
          loading ? (<React.Fragment><Loading /></React.Fragment>) : (<div className="home-main-container">
            {
              (data.length !== 0) ? (
                <React.Fragment>

                  <div className="h-top-bar">
                    <div className='dp-mp'>
                      <div className='dp'><h2>Products List</h2></div>
                      <div className='ap'><button onClick={handleClick} id='mp'>{<IoBagAddOutline />} <span>Add Products</span></button></div>
                    </div>
                  </div>

                  <div className="card-wrapper"  >
                    {filteredProducts.length ? filteredProducts.map((el) => (
                      <div key={el.id}>
                        <Card
                          product_id={el.id}
                          imageUrl={el.image}
                          title={el.name}
                          description={el.description}
                          price={el.price}
                          productDelete={handleDelete}

                        />
                      </div>
                    )) : data.map((el) => (
                      <div key={el.id}>
                        <Card
                          product_id={el.id}
                          imageUrl={el.image}
                          title={el.name}
                          description={el.description}
                          price={el.price}
                          productDelete={handleDelete}

                        />
                      </div>

                    ))}

                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>

                  <div className="h-top-bar">
                    <div className='dp-mp'>
                      <div className='dp'>Default Products</div>
                      <div><button id='mp' onClick={handleClick}  > {<IoBagAddOutline />} Add Products</button></div>
                    </div>
                  </div>
                  <div className="card-wrapper"  >
                    <DefaultCard />
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