import { useRouter } from 'next/router'
import React from 'react'

const Spend = () => {
    const router = useRouter()
    const category = router.query.category;
    const id = router.query.id;
  return (
    <div>Spend Number {id} on {category}</div>
  )
}

export default Spend