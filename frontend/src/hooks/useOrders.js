import { useState, useEffect } from 'react'
import axios from '../api.js'

export function useOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get('/orders')
      .then(res => setOrders(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { orders, loading, error }
}
