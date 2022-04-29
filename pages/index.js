import { useState } from 'react'
import NewSpendForm from '../components/NewSpendForm'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className='p-10'>
        <h1 className='text-center text-3xl font-bold text-blue-600'>MONEYGER</h1>
        <h2 className='text-center text-2xl text-blue-600 italic'>my money manager</h2>
        <div className='text-center my-10'>
          <button onClick={() => setIsOpen(true)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add New Spend</button>
        </div>
      </div>
      {isOpen && <div className='z-50 fixed top-0 left-0 w-full h-full bg-black-rgba' >
        <NewSpendForm setIsOpen={setIsOpen} />
      </div>}
    </>
  )
}
