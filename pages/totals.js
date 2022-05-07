import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Totals = () => {
    const [cats, setCats] = useState([])
    const [data, setData] = useState([])
    const router = useRouter()
    useEffect(() => {
        window.localStorage.getItem('cats') ? setCats(JSON.parse(window.localStorage.getItem('cats'))) : setCats([])
        window.localStorage.getItem('spendsData') ? setData(JSON.parse(window.localStorage.getItem('spendsData'))) : setData('')
    }, [])
    return (
        <div className='p-2'>
            <h1 className='text-center text-2xl m-2 md:m-4'>Grand Total: <span>{data?.reduce((a, c) => a + c.amount, 0)}</span></h1>
            <div className='flex flex-col p-8 w-full items-center'>
                {cats?.map((cat) => (
                    <button key={cat} onClick={() => router.push(`/spends/${cat.toLowerCase()}`)} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-64'>{cat}</button>
                ))}
            </div>
        </div>
    )
}

export default Totals