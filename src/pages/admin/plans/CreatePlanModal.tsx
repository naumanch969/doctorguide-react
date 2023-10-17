 

import {  Plan } from "../../../interfaces"
import { createPlan } from "../../../redux/action/plan"
import { RootState } from "../../../redux/store"
import { Clear } from "@mui/icons-material"
import { Modal } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"



const CreatePlanModal = ({ open, setOpen }: { open: boolean, setOpen: any }) => {

    ////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const { isFetching }: { isFetching: boolean } = useSelector((state: RootState) => state.plan)
    const dispatch = useDispatch()
    const initialState = {
        _id: "",
        name: "",
        billing: "",
        price: "",
        messagesPerMonth: 0,
        priceId: "",
        features: []
    }
    ////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [planData, setPlanData] = useState<Plan>(initialState)
    const [featureValue, setFeatureValue] = useState<string>('')

    ////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////

    ////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
    const handleSubmit = () => {
        const { features, name, billing, price, priceId, messagesPerMonth } = planData
        if (!features || !name || !billing || !price || !priceId || !messagesPerMonth) return alert('Make sure to provide all the fields')
        dispatch<any>(createPlan(planData))
        setOpen(false)
    }
    const hanldeFilterFeature = (featureToFilter: string) => {
        setPlanData({ ...planData, features: planData.features.filter((feature: string) => feature !== featureToFilter) })
    }
    const handleAddEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        const inputElement = e.target as HTMLInputElement; // Cast e.target to HTMLInputElement
        const value = inputElement.value;

        if (!value.trim()) return;
        setPlanData({ ...planData, features: planData.features.concat(value) });
        inputElement.value = '';
        setFeatureValue('');
    }
    ////////////////////////////////////////////////////// COMPONENTS ///////////////////////////////////////////////
    const Feature = ({ feature }: { feature: string }) => (
        <div className="flex gap-[8px] items-center justify-between border-[1px] border-main-blue rounded-[16px] py-[2px] px-[6px] bg-lightGray w-auto " >
            <p className="text-black font-medium w-max text-[14px] " >{feature}</p>
            <Clear style={{ fontSize: '1rem' }} onClick={() => hanldeFilterFeature(feature)} className={`cursor-pointer text-black text-[1rem] bg-lightGray rounded-full `} />
        </div>
    )



    return (
        <Modal open={open} onClose={() => setOpen(false)} className='flex justify-center items-center' >
            <div className='bg-white flex flex-col gap-[1.5rem] md:w-[30rem] sm:w-[80vw] w-[95vw] max-h-[80vh] overflow-y-scroll rounded-lg md:p-8 sm:p-6 p-4  ' >

                <div className="w-full flex justify-start items-center gap-[8px] ">
                    <h3 className="text-[24px] text-main-blue font-bold " >Create Plan</h3>
                </div>

                <div className="flex flex-col gap-[1rem] ">
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="subject" className='font-semibold text-main-blue text-[18px] ' >Features</label>
                        <div className={`${planData.features.length && 'p-2 border-[1px]'} border-gray-500 rounded-md flex flex-wrap gap-[8px] w-full min-h-[40px] `} >
                            {
                                planData.features.map((feature, index) => (
                                    <Feature feature={feature} key={index} />
                                ))
                            }
                            <input
                                className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                                placeholder="Emails - separated by enter"
                                value={featureValue}
                                onChange={(e) => setFeatureValue(e.target.value)}
                                onKeyDown={(e) => handleAddEmail(e)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="name" className='font-semibold text-main-blue text-[18px] ' >Name</label>
                        <select value={planData.name} onChange={(e) => setPlanData({ ...planData, name: e.target.value })} className="w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block py-3 px-6 dark:focus:ring-blue-500">
                            <option value={''}>Select Name</option>
                            <option value={'FREE'}  >Free</option>
                            <option value={'BASIC'}  >Basic</option>
                            <option value={'PRO'}  >Pro</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="name" className='font-semibold text-main-blue text-[18px] ' >Billing</label>
                        <select value={planData.billing} onChange={(e) => setPlanData({ ...planData, billing: e.target.value })} className="w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block py-3 px-6 dark:focus:ring-blue-500">
                            <option value={''}>Select Billing</option>
                            <option value={'MONTHLY'}  >Monthly</option>
                            <option value={'YEARLY'}  >Yearly</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="price" className='font-semibold text-main-blue text-[18px] ' >Price</label>
                        <input
                            value={planData.price}
                            onChange={(e) => setPlanData({ ...planData, price: e.target.value })}
                            id='price'
                            placeholder='price'
                            className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="priceId" className='font-semibold text-main-blue text-[18px] ' >Price Id</label>
                        <input
                            value={planData.priceId}
                            onChange={(e) => setPlanData({ ...planData, priceId: e.target.value })}
                            id='priceId'
                            placeholder='priceId'
                            className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="messagesPerMonth" className='font-semibold text-main-blue text-[18px] ' >Messages Per Month</label>
                        <input
                            type="number"
                            value={planData.messagesPerMonth}
                            onChange={(e) => setPlanData({ ...planData, messagesPerMonth: Number(e.target.value) })}
                            id='messagesPerMonth'
                            placeholder='messagesPerMonth'
                            className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="w-full flex justify-end items-center gap-[1rem] ">
                    <button onClick={() => setOpen(false)} className='flex justify-center items-center text-[18px] px-[1rem] py-[10px] rounded-full w-[8rem] bg-white text-main-blue border-[1px] border-main-blue '>
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className='flex justify-center items-center gap-2 text-[18px] px-[1rem] py-[10px] rounded-full w-[12rem] bg-main-blue text-white '>
                        {isFetching ? 'Save...' : 'Save'}
                    </button>
                </div>

            </div>
        </Modal>
    )
}

export default CreatePlanModal