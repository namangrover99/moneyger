import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { SpendCard } from '.';

const Category = () => {
  const router = useRouter()
  const { category } = router.query;
  // const cat = category?.charAt(0).toUpperCase() + category?.slice(1)
  const cat = category?.split(' ').join('_')
  const [data, setData] = useState([])
  const [spends, setSpends] = useState([])
  const [total, setTotal] = useState(0)
  useEffect(() => {
    spends.length > 0 && setTotal(() => spends.reduce((a, c) => a + c.amount, 0))
  }, [spends])
  // console.log(data)
  useEffect(() => {
    window.localStorage.getItem('spendsData') ? setData(() => JSON.parse(window.localStorage.getItem('spendsData'))) : setData([])
  }, [category])
  useEffect(() => {
    setSpends(() => data.filter(ele => ele.category == cat))
  }, [data])
  const d = spends?.filter((spend) => new Date(spend.date).getMonth() === new Date().getMonth())
    const thisMonthTotal = d?.reduce((a, c) => a + c.amount, 0)
  return (
    <>
      <div className='p-8 bg-gray-100 min-h-screen'>
        {spends.length > 0 ? <>
          <h1 className='text-center font-bold text-2xl'>{cat.split('_').map(word => word?.charAt(0).toUpperCase() + word?.slice(1)).join(' ')}</h1>
          <h1 className='text-center text-2xl my-2'>Total: <span className='text-red-500 font-bold'>{total}</span></h1>
          <h1 className='text-center text-2xl my-2'>This Month: <span className='text-red-500 font-bold'>{thisMonthTotal}</span></h1>
          <div className='md:flex md:flex-wrap'>
            {spends?.length > 0 && spends.map((spend) => (
              <SpendCard key={spend.id} spend={spend} spends={spends} setSpends={setSpends} />
            ))}
          </div>
        </> : <h1 className='text-center italic text-2xl'>No spends to show for this category...</h1>}
        <h1 className='text-lg md:text-3xl font-bold italic absolute left-1/2 -translate-x-1/2 bottom-10'>Go to <span className='text-blue-500'><Link href='/'>homepage</Link></span></h1>
      </div>
      
    </>

  )
}

export default Category

// export const getStaticProps = async () => {
//   const cats = window.localStorage.getItem('cats')
//   return{
//     props: {
//       cats
//     }
//   }
// } 