import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import React from 'react'

const NewSpendForm = ({ setIsOpen, data, setData, cats }) => {
    const initialValues = {
        amount: '',
        category: '',
        desc: '',
        date: '',
        time: '',
        place: ''
    }
    const validationSchema = Yup.object().shape({
        amount: Yup.number().required('This field is required!'),
        category: Yup.string().required('This field is required!'),
        desc: Yup.string(),
        date: Yup.string().required('This field is required'),
        time: Yup.string(),
        place: Yup.string()
    })
    const handleSubmit = (values) => {
        const newData = { ...values, id: Date.now() }
        const newSpendsData = [...data, newData]
        setData(() => newSpendsData)
        window.localStorage.setItem('spendsData', JSON.stringify(newSpendsData))
        setTimeout(() => {
            setIsOpen(false)
        }, 200)
    }
    const FIELDS = [
        { name: 'amount', type: 'number', options: null, placeholder: 'Enter the amount' },
        { name: 'category', type: 'select', options: [], placeholder: 'Select appropriate category' },
        { name: 'desc', type: 'text', options: null, placeholder: 'Enter brief description' },
        { name: 'date', type: 'date', options: null, placeholder: 'Enter relevant date' },
        { name: 'time', type: 'time', options: null, placeholder: 'Enter relevant timings' },
        { name: 'place', type: 'text', options: null, placeholder: 'Enter the place' },
    ]
    return (
        <div className='bg-white w-11/12 sm:w-1/2 mx-auto sm:my-10 my-20 px-6 py-8 rounded-xl relative'>
            <span onClick={() => setIsOpen(false)} className='absolute right-5 top-5 text-black font-bold cursor-pointer'>x</span>
            <h1 className='text-center my-4 text-xl font-bold text-blue-600'>New Spend</h1>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        {FIELDS.map((field) => (
                            field.type === 'select' ?
                                <div className='my-4' key={field.name}>
                                    <label className='block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300'>{field.placeholder}</label>
                                    <Field className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" as={field.type} name={field.name}>
                                        <option value={''}>Select a category</option>
                                        {cats.map((option) => (
                                            <option key={option} value={option} >{option}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name={field.name}>
                                        {msg => <span className="text-sm text-red-600" >{msg}</span>}
                                    </ErrorMessage>
                                </div> : <div className='my-4' key={field.name}>
                                    <label className='block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300'>{field.placeholder}</label>
                                    <Field className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type={field.type} name={field.name} />
                                    <ErrorMessage name={field.name}>
                                        {msg => <span className="text-sm text-red-600" >{msg}</span>}
                                    </ErrorMessage>
                                </div>
                        ))}
                        <div className='text-center my-4'>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add New Spend</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default NewSpendForm