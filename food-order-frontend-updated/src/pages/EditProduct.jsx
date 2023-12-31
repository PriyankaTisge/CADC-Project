import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { apiRequest,SERVER_URL } from '../libs/request'
import productvalidation from '../validations/productvalidation'

function EditProduct() {
  console.log('Edit product page')
  const { prodid } = useParams()
  const [cats,setcats]=useState([])
  const [product, setProduct] = useState({
    prodid: prodid,
    pname: '',
    category: '',
    price: '',
    descr: '',
  })

  const [errors, setErrors] = useState({})
  const [selectedPhoto,setSelectedPhoto]=useState(null)
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }
  const handleFileInput=e=>{
    setSelectedPhoto(e.target.files[0])
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(productvalidation(product))
    setSubmitted(true)
  }

  useEffect(() => {
    console.log(errors)

    apiRequest.get('products/' + prodid).then((resp) => {
      console.log(resp.data)
      setProduct(resp.data)
      //setProduct({...product,category:resp.data.category.id})
    })

    apiRequest.get('categories') 
        .then(resp=>setcats(resp.data))
        .catch(error=>toast.error(error))

    if (Object.keys(errors).length === 0 && submitted) {
      console.log(product)
      const formData=new FormData()
      formData.append("pic",selectedPhoto)
      formData.append("pname",product.pname)
      formData.append("category",product.category.id)
      formData.append("price",product.price)
      formData.append("descr",product.descr)
      console.log(product)
      apiRequest
        .put('products/' + prodid, formData)
        .then((resp) => {
          let result = resp.data
          console.log(result)
          toast.success('Product updated successfully')
          navigate('/products')
        })
        .catch((error) => {
          toast.error('Error saving product')
        })
    }
  }, [errors])
  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-sm-3'>
          <img
            width='250'
            style={{ marginTop: '20px' }}
            src={SERVER_URL+ product?.photo}
          />
        </div>
        <div className='col-sm-6 '>
          <h4 className='text-center p-2'>Edit Product Form</h4>
          <form onSubmit={handleSubmit}>
            <div className='form-group form-row'>
              <label className='col-sm-4 form-control-label'>
                Product Name
              </label>
              <div className='col-sm-8'>
                <input
                  type='text'
                  name='pname'
                  value={product?.pname}
                  onChange={handleInput}
                  className='form-control'
                />
                {errors.pname && (
                  <small className='text-danger float-right'>
                    {errors.pname}
                  </small>
                )}
              </div>
            </div>
            <div className='form-group form-row'>
              <label className='col-sm-4 form-control-label'>Category</label>
              <div className='col-sm-8'>
                <select
                  name='category'
                  value={product.category.id}
                  onChange={handleInput}
                  className='form-control'
                >
                  <option value=''>Select Category</option>
                  {cats.filter(x=>x.isactive).map(x=>(
                      <option value={x.id}>{x.catname}</option>
                  ))}                  
                </select>
                {errors.pcat && (
                  <small className='text-danger float-right'>
                    {errors.pcat}
                  </small>
                )}
              </div>
            </div>
            <div className='form-group form-row'>
              <label className='col-sm-4 form-control-label'>Description</label>
              <div className='col-sm-8'>
                <input
                  type='text'
                  name='descr'
                  value={product?.descr}
                  onChange={handleInput}
                  className='form-control'
                />
                {errors.descr && (
                  <small className='text-danger float-right'>
                    {errors.descr}
                  </small>
                )}
              </div>
            </div>
            <div className='form-group form-row'>
              <label className='col-sm-4 form-control-label'>Price</label>
              <div className='col-sm-8'>
                <input
                  type='number'
                  min='1'
                  name='price'
                  value={product.price}
                  onChange={handleInput}
                  className='form-control'
                />
                {errors.price && (
                  <small className='text-danger float-right'>
                    {errors.price}
                  </small>
                )}
              </div>
            </div>
            <div className='form-group form-row'>
              <label className='col-sm-4 form-control-label'>Price</label>
              <div className='col-sm-8'>
                <input
                  type='file'
                  name='photo'  
                  onChange={handleFileInput}                
                  className='form-control'
                />
                
              </div>
            </div>

            <button className='btn btn-primary float-right'>
              Update Product
            </button>
          </form>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  )
}

export default EditProduct
