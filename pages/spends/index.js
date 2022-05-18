import { Delete } from '@material-ui/icons'
import Link from 'next/link'
import { withRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export const SpendCard = ({ spend, colors, spends, setSpends }) => {
  const [isDltPopupOpen, setIsDltPopupOpen] = useState(false)
  // const randomColorCodeGenerator = () => {
  //   const chars = ['A', 'B', 'C', 'D', 'E', 'F', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  //   let newColor = ''
  //   for(let i = 0; i < 6; i++){
  //     newColor += chars[Math.floor(Math.random() * chars.length)]
  //   }
  //   return newColor;
  // }
  const handleDelete = () => {
    const newSpends = spends.filter((thisSpend => thisSpend.id !== spend.id))
    setSpends(() => newSpends)
    window.localStorage.setItem('spendsData', JSON.stringify(newSpends))
    setIsDltPopupOpen(false)
  }

  return (
    <>
      <div className={`flex flex-col bg-white shadow-lg w-full my-4 md:m-6 md:w-4/12 md:min-h-32 rounded-xl border-4 p-4 cursor-pointer relative`}>
        <h1 style={{ backgroundColor: colors?.length > 0 && colors.find(color => color.category === spend.category)?.color }} className='text-white rounded-lg font-bold w-fit p-2 absolute top-1 left-1'>{spend.category}</h1>
        <h1 onClick={() => setIsDltPopupOpen(true)} className='justify-self-end text-red-600 font-bold absolute top-1 left-1/2 -translate-x-1/2'><Delete /></h1>
        <h1 className='justify-self-end text-red-600 font-bold absolute top-1 right-2'>Rs.{spend.amount}</h1>
        <h1 className='text-xl mb-4 mt-10'>{spend.desc}</h1>
        <div className='flex justify-between'>
          <p>At <span className='font-bold'>{spend.time}</span> on <span className='font-bold'>{new Date(spend.date).toDateString()}</span></p>
          <p className='font-bold'>{spend.place}</p>
        </div>
      </div>
      {isDltPopupOpen && <div className='z-50 fixed top-0 left-0 w-full h-full bg-black-rgba' >
        <div className='bg-white w-11/12 sm:w-1/2 mx-auto sm:my-10 my-20 px-4 py-6 rounded-xl relative'>
          <h1 className='font-bold text-lg m-2'>This will be deleted permanently. Still proceed?</h1>
          <div className='flex justify-evenly mt-4'>
            <button onClick={() => setIsDltPopupOpen(false)} className="text-white bg-gray-400 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Cancel</button>
            <button onClick={handleDelete} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Yes, Delete</button>
          </div>
        </div>
      </div>}
    </>
  )
}

const Spends = () => {
  const [spends, setSpends] = useState([])
  const [colors, setColors] = useState([])
  const [selected, setSelected] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const getWeek = (date = new Date()) => {
    var currentDate = new Date(date);
    var firstday = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())).toDateString();
    return firstday;
  }
  useEffect(() => {
    if (selectedDuration === 'month') {
      let original = window.localStorage.getItem('spendsData') ? JSON.parse(window.localStorage.getItem('spendsData')) : []
      let data = original.filter((spend) => new Date(spend.date).getMonth() === new Date().getMonth())
      setSpends(data)
    }
    if (selectedDuration === 'week') {
      let original = window.localStorage.getItem('spendsData') ? JSON.parse(window.localStorage.getItem('spendsData')) : []
      let data = original.filter((spend) => getWeek(spend.date) === getWeek())
      setSpends(data)
    }
    if (selectedDuration === 'today') {
      let original = window.localStorage.getItem('spendsData') ? JSON.parse(window.localStorage.getItem('spendsData')) : []
      let data = original.filter((spend) => new Date(spend.date).toDateString() === new Date().toDateString())
      setSpends(data)
    }
    selected && setSpends(spends.filter((spend) => spend.category === selected))
  }, [selected, selectedDuration])

  const randomColorCodeGenerator = () => {
    const options = ['#d67229', '#df4e4f', '#8066ff', '#ff5c00', '#000080', '#990000', '#0a75ad', '#3a4f38', '#808000', '#808000', '#808000', '#808000']
    let newColor = options[Math.floor(Math.random() * options.length)]
    while (colors.map(color => color.color).includes(newColor) && options.length >= colors.length) {
      newColor = options[Math.floor(Math.random() * options.length)]
    }
    return newColor;
  }

  useEffect(() => {
    setSpends(window.localStorage.getItem('spendsData') ? JSON.parse(window.localStorage.getItem('spendsData')).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))).concat(JSON.parse(window.localStorage.getItem('spendsData'))) : [])
  }, [])


  useEffect(() => {
    spends.forEach((spend) => {
      if (colors.length === 0) {
        const newColor = randomColorCodeGenerator()
        const newColors = [{ category: spend.category, color: newColor }]
        setColors(() => newColors)
      }
      if (!colors.map(color => color.category).includes(spend.category)) {
        const newColor = randomColorCodeGenerator()
        const newColors = [...colors, { category: spend.category, color: newColor }]
        setColors(() => newColors)
      }
    })
  }, [spends, colors])
  return (
    <div className='p-8 relative'>
      {spends.length > 0 ? <div>
        <div className='flex flex-wrap mb-4'>
          <button className={`text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 md:mr-8 mb-2 dark:bg-blue-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800 ${selectedDuration === 'month' && 'bg-blue-800'}`} onClick={() => setSelectedDuration('month')}>This Month</button>
          <button className={`text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 md:mr-8 mb-2 dark:bg-blue-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800 ${selectedDuration === 'week' && 'bg-blue-800'}`} onClick={() => setSelectedDuration('week')}>This Week</button>
          <button className={`text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 md:mr-8 mb-2 dark:bg-blue-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800 ${selectedDuration === 'today' && 'bg-blue-800'}`} onClick={() => setSelectedDuration('today')}>Today</button>
          <button className={`text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 md:mr-8 mb-2 dark:bg-blue-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800 ${selected === 'Food' && 'bg-blue-800'}`} onClick={() => setSelected('Food')}>Food</button>
          <button className={`text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 md:mr-8 mb-2 dark:bg-blue-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800 ${selected === 'Travel' && 'bg-blue-800'}`} onClick={() => setSelected('Travel')}>Travel</button>
          <button className={`text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 md:mr-8 mb-2 dark:bg-blue-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800 ${selected === 'Travel' && 'bg-blue-800'}`} onClick={() => {
            setSpends(window.localStorage.getItem('spendsData') ? JSON.parse(window.localStorage.getItem('spendsData')) : [])
            setSelected('')
            setSelectedDuration('')
          }}>Clear Filters</button>
          <select type={"select"} className="text-white bg-blue-500 font-medium rounded text-sm px-5 py-2.5 mr-2 mb-2 w-54 outline-none" onChange={(e) => setSelected(e.target.value)} placeholder='Select custom'>
            <option>Select custom category</option>
            {window.localStorage.getItem('cats') && JSON.parse(window.localStorage.getItem('cats')).map((cat) => (
              <option className='m-5 rounded-lg' key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className='md:flex md:flex-wrap'>
          {spends.map((spend) => (
            <SpendCard key={spend.id} spend={spend} colors={colors} spends={spends} setSpends={setSpends} />
          ))}
        </div>
        <h1 className='text-lg md:text-3xl font-bold italic absolute left-1/2 -translate-x-1/2 bottom-10'>Go to <span className='text-blue-500'><Link href='/'>homepage</Link></span></h1>
      </div> : <h1 className='text-center text-xl md:text-3xl font-bold italic'>No Spends To Show... Go to <span className='text-blue-500'><Link href='/'>homepage</Link></span></h1>}
    </div>
  )
}

export default Spends