import { Delete } from '@material-ui/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Totals = () => {
    const [cats, setCats] = useState([])
    const [data, setData] = useState([])
    const [isDltPopupOpen, setIsDltPopupOpen] = useState(false)
    const router = useRouter()
    useEffect(() => {
        window.localStorage.getItem('cats') ? setCats(JSON.parse(window.localStorage.getItem('cats'))) : setCats([])
        window.localStorage.getItem('spendsData') ? setData(JSON.parse(window.localStorage.getItem('spendsData'))) : setData([])

    }, [])
    const handleDelete = (category) => {
        const newCats = cats.filter((ele) => ele != category)
        setCats(() => newCats)
        const newData = data.filter(ele => ele.category != category)
        setData(() => newData)
        window.localStorage.setItem('cats', JSON.stringify(newCats))
        window.localStorage.setItem('spendsData', JSON.stringify(newData))
        setIsDltPopupOpen(() => false)
    }
    const d = data?.filter((spend) => new Date(spend.date).getMonth() === new Date().getMonth())
    const thisMonthTotal = d?.reduce((a, c) => a + c.amount, 0)
    return (
        <>
            <div className='p-2'>
                <h1 className='text-center text-2xl m-2 md:m-4'>Grand Total: <span className='text-red-500 font-bold'>{data?.reduce((a, c) => a + c.amount, 0)}</span></h1>
                <h1 className='text-center text-2xl m-2 md:m-4'>This Month Total: <span className='text-red-500 font-bold'>{thisMonthTotal}</span></h1>
                <div className='flex flex-col p-8 w-full items-center'>
                    {cats?.map((cat) => (
                        <div key={cat} className='flex items-center'>
                            <button onClick={() => router.push(`/spends/${cat.toLowerCase()}`)} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-64'>{cat.split('_').map(word => word?.charAt(0).toUpperCase() + word?.slice(1)).join(' ')}</button>
                            <Delete className='text-red-500 cursor-pointer' onClick={() => setIsDltPopupOpen(true)} />
                            {isDltPopupOpen && <div className='z-50 fixed top-0 left-0 w-full h-full bg-black-rgba' >
                                <div className='bg-white w-11/12 sm:w-1/2 mx-auto sm:my-10 my-20 px-4 py-6 rounded-xl relative'>
                                    <h1 className='font-semibold text-lg m-2'>This will delete all the related data permanently. Still proceed?</h1>
                                    <div className='flex justify-evenly mt-4'>
                                        <button onClick={() => setIsDltPopupOpen(false)} className="text-white bg-gray-400 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Cancel</button>
                                        <button onClick={() => handleDelete(cat)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Yes, Delete</button>
                                    </div>
                                </div>
                            </div>}
                        </div>

                    ))}
                </div>
                <h1 className='text-lg md:text-3xl font-bold italic absolute left-1/2 -translate-x-1/2 bottom-10'>Go to <span className='text-blue-500'><Link href='/'>homepage</Link></span></h1>
            </div>

        </>

    )
}

export default Totals