import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import NewCategoryForm from '../components/NewCategoryForm'
import NewSpendForm from '../components/NewSpendForm'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCatFormOpen, setIsCatFormOpen] = useState(false)
  const router = useRouter()
  const [data, setData] = useState([])
  const [cats, setCats] = useState([])
  useEffect(() => {
    setData(window.localStorage.getItem('spendsData') ? JSON.parse(window.localStorage.getItem('spendsData')) : [])
    setCats(window.localStorage.getItem('cats') ? JSON.parse(window.localStorage.getItem('cats')) : ['Food', 'Travel'])
  }, [])
  return (
    <>
      <div className='p-10'>
        <h1 className='text-center text-3xl font-bold text-blue-600'>MONEYGER</h1>
        <h2 className='text-center text-2xl text-blue-600 italic'>my money manager</h2>
        <div className='text-center my-10 flex flex-col items-center'>
          <button onClick={() => setIsOpen(true)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-64">Add New Spend</button>
          <button onClick={() => setIsCatFormOpen(true)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-64">Add New Category</button>
          <button onClick={() => router.push('/spends')} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-64">View All Spends</button>
          <button onClick={() => router.push('/totals')} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-64">View Totals Category Wise</button>
        </div>
      </div>
      {isOpen && <div className='z-50 absolute top-0 left-0 w-full h-full bg-black-rgba' >
        <NewSpendForm setData={setData} data={data} setIsOpen={setIsOpen} cats={cats} />
      </div>}
      {isCatFormOpen && <div className='z-50 absolute top-0 left-0 w-full h-full bg-black-rgba'>
        <NewCategoryForm setIsCatFormOpen={setIsCatFormOpen} cats={cats} setCats={setCats} />
      </div>}
    </>
  )
}
