import React, { useState } from 'react'

const NewCategoryForm = ({ setIsCatFormOpen, cats, setCats }) => {
    const [txt, setTxt] = useState('')
    const handleSave = () => {
        const newCat = txt.charAt(0).toUpperCase() + txt.slice(1)
        const newCats = [...cats, newCat]
        setCats(() => newCats)
        window.localStorage.setItem('cats', JSON.stringify(newCats))
        setTimeout(() => {
            setIsCatFormOpen(false)
        },200)
    }
    return (
        <div className='bg-white w-11/12 sm:w-1/4 mx-auto sm:my-20 my-20 px-6 py-8 rounded-xl relative'>
            <span onClick={() => setIsCatFormOpen(false)} className='absolute right-5 top-5 text-black font-bold cursor-pointer'>x</span>
            <h1 className='text-center my-4 text-xl font-bold text-blue-600'>New Category</h1>
            <div className='m-2'>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Name of the Category
                </label>
                <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type={"text"} value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Transportation / Food ..." />
            </div>
            <div className='text-center m-4'>
                <button onClick={handleSave} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Save</button>
            </div>
        </div>
    )
}

export default NewCategoryForm