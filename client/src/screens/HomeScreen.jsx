import React from 'react'
import { products } from '../data/products'
import Product from '../components/Product'


const HomeScreen = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-cyan-400'>
      {
        products.map((product, i) => (
          <Product key={i} product={product} />
        ))
      }
    </div>
  )
}

export default HomeScreen
