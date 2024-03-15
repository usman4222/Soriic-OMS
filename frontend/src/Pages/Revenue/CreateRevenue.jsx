import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import Header from '../../components/Header'
import Sidebar from '../Sidebar'
import { addNewRevenue } from '../../actions/revenue'
import { useNavigate } from 'react-router-dom'

const CreateRevenue = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()

    const [ref, setRef] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const addExpenseHandler = async (e) => {
        e.preventDefault();

        try {
            const revenueData = {
                ref: ref,
                amount: amount,
                description: description,
                date: date,
            };

            await dispatch(addNewRevenue(revenueData));
            enqueueSnackbar('Revenue added Successfully', { variant: 'success' });
            navigate('/allrevenue')
        } catch (error) {
            console.error(error.message);
        }
    };


    return (
        <Fragment>
            <div className='main'>
                <div className='row w-full'>
                    <div className='col-lg-2'>
                        <Sidebar />
                    </div>
                    <div className='col-lg-10'>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <Header />
                            </div>
                        </div>
                        <div className='main-form'>
                            <div className='addUser'>
                                <form
                                    className='createProductForm'
                                    encType='multipart/form-data'
                                    onSubmit={addExpenseHandler}
                                >
                                    <h2 >Add Revenue</h2>
                                    <input
                                        type='text'
                                        placeholder='Ref'
                                        required
                                        value={ref}
                                        onChange={(e) => setRef(e.target.value)}
                                    />
                                    <input
                                        type='text'
                                        placeholder='Amount'
                                        required
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                    <input
                                        type='text'
                                        placeholder='Description'
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <input
                                        type='date'
                                        className='date-input cursor-pointer hover:bg-gray-100'
                                        placeholder='Date'
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    <div className='submitBtn'>
                                        <button type='submit'>Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateRevenue
