import React from 'react'
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from '../../slices/productsApiSlice';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

const ProductListScreen = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation()
  const [deleteProduct,{isLoading:loadingDelete}] = useDeleteProductMutation()
  

  const navigate = useNavigate()

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return toast.error(error?.data?.message || error?.error)
  }

  const createProductHandler = async () => {

    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct()
        toast.success("Product Created")
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }
  }

  const deleteCreateHandler = async (productId) => {
    if(window.confirm("Are you sure you want to delete this product")){
      try {
        await deleteProduct(productId)
        toast.success("Product Deleted Successfully")
      } catch (error) {
        toast.error(error?.data.message || error?.message)
      }
    }
  }

  const editCreateHandler = async (productId) => {
    if(window.confirm("Are you sure you want to edit this product")){
      try {
      navigate(`/admin/product/${productId}/edit`)
      } catch (error) {
        toast.error(error?.data?.message || error?.message)
      }
    }
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-semibold mb-4'>Products</h2>
        <button className='bg-blue-500 rounded-md text-white py-2 px-4 mb-4' onClick={createProductHandler}>Create Product</button>
        {loadingCreate && <Spinner />}
      </div>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead>
          <tr className='bg-stone-50 bg-opacity-20'>
            <td className="  py-3 bg-stone-50 bg-opacity-20 text-center text-xs leading font-medium text-gray-500 uppercase tracking-wider">Image</td>
            <td className="px-6 py-3 bg-stone-50 bg-opacity-20 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</td>
            <td className="px-6 py-3 bg-stone-50 bg-opacity-20 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Price</td>
            <td className="px-6 py-3 bg-stone-50 bg-opacity-20 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Brand</td>
            <td className="px-6 py-3 bg-stone-50 bg-opacity-20 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</td>
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-200">
          {data && data.map((product) => (
            <tr key={product._id} className='border h-14'>
              <td className='border text-center px-3 '><img src={product.image} className='h-10 w-10 rounded-md ' alt="" /></td>
              <td className='border'>{product.name}</td>
              <td className='border'>₹{product.price}</td>
              <td className='border'>{product.brand}</td>
              <td className='border'><button className='bg-blue-500 rounded-md py-1 px-4 mr-4'onClick={()=> editCreateHandler(product._id)}>Edit</button><button className='bg-red-500 rounded-md py-1 px-4' onClick={()=>deleteCreateHandler(product._id)}>Delete</button>{loadingDelete && <Spinner/>}</td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default ProductListScreen
