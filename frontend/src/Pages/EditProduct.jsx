
import React, { useEffect, useState } from 'react'
import apiService from '../Config/apiServices';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Component/Navbar';

function EditProduct() {
const [data, setData] = useState([])

let {product_id,user,title} = useParams()
const productId = parseInt(product_id)

const navigate = useNavigate()




  useEffect(()=>{
  
     const getSingleProducts  = async()=>{
    try {
      const response = await apiService.get(`/${user}/single_product/${productId}/${title}`)
  
      if(response.data.result===true){
        setData(response.data.data[0])
      }
    } catch (error) {
      console.log(error)
    }
  
     }

     getSingleProducts()

  },[])
  
const initialValues = {
    name:'',
    image: '',
    price: '',
    description:'',
    type:''

  };


  const onSubmit = async (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
    }, 500);
    const response = await apiService.patch(`/${user}/update_product/${product_id}/${title}`,values,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
          if(response.data.result === true){
            alert("Product Edited  successfully ")
            navigate(`/${user}/home`)
          }
  };


  const productSchema = Yup.object({
    name: Yup.string(),
    image: Yup.string().url('image must be a url').nullable(),
    description: Yup.string().min(20, "minimum 20 characters are required"),
    price:Yup.number('it must be a number'),
    type:Yup.string().required('catgory is required').oneOf(['electronics', 'clothing', 'books'])

  });

  if(!data){
    return <p>Loading...</p>; 
  }
  return (

   <React.Fragment>
    <Navbar />
     <div>
    <h1 className='edit-form-heading'>Edit Product</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={productSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form id='login-main'>
          <fieldset>
            <div className='mb-1'>
              <label htmlFor="product_name" className='form-label required'>Product Name</label>
              <Field type="text" id="product_name"  placeholder={data.name} className='form-control' name="name" />
              <ErrorMessage name="product_name" component="div" />
            </div>
          </fieldset>
          <fieldset>
            <div className='mb-2'>
              <label htmlFor="product_image" className='form-label required'>Product Image</label>
              <Field type="text" id="product_image" placeholder={data.image} className='form-control' name="image" />
              <ErrorMessage name="image" component="div" />
            </div>
          </fieldset>

          <fieldset>
          <div className='mb-3'>
              <label htmlFor="description" className='form-label required'>Description</label>
              <Field as='textarea' type="text" placeholder={data.description} id="description" data-bs-toggle="autosize" className='form-control' name="description" />
              <ErrorMessage name="description" component="div" />
            </div>
          </fieldset>
          <fieldset>
          <div className='mb-4'>
              <label htmlFor="price" className='form-label required'>Price</label>
              <Field type="text" id="price" placeholder={data.price}  className='form-control' name="price" />
              <ErrorMessage name="price" component="div" />
            </div>
           </fieldset>

           <fieldset>
            
            <div className='mb-5'>
                <label htmlFor="category" className='form-label required'>Type</label>
                <Field as='select' placeholder=';d' id="category" className='form-control' name="type" >
                  <option value="">select</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  </Field>
                <ErrorMessage name="type" component="div" />
              </div>
            </fieldset>

           <fieldset>
            <div>
              <button id='login-btn' className='form-control' type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </fieldset>
        </Form>
      )}
    </Formik>
  </div>
   </React.Fragment>
  )
}

export default EditProduct