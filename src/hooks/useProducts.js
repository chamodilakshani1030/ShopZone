import { useState, useEffect } from 'react'
import axios from 'axios'
import { supabase } from '../lib/supabase'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Try Supabase first
        if (supabase.supabaseUrl) {
          const { data, error: supabaseError } = await supabase
            .from('products')
            .select('*')

          if (supabaseError) {
            console.warn('Supabase error:', supabaseError)
            throw new Error('Supabase unavailable')
          }

          if (data && data.length > 0) {
            setProducts(data)
            setLoading(false)
            return
          }
        }

        // Fallback to FakeStore API
        const response = await axios.get('https://fakestoreapi.com/products')
        setProducts(response.data)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}

export const useProduct = (id) => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Try Supabase first
        if (supabase.supabaseUrl) {
          const { data, error: supabaseError } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single()

          if (supabaseError && supabaseError.code !== 'PGRST116') {
            console.warn('Supabase error:', supabaseError)
            throw new Error('Supabase unavailable')
          }

          if (data) {
            setProduct(data)
            setLoading(false)
            return
          }
        }

        // Fallback to FakeStore API
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
        setProduct(response.data)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return { product, loading, error }
}
