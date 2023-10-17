

import { Plan } from '../../interfaces'
import { getPlans } from '../../redux/action/plan'
import { checkoutSubscription } from '../../redux/api'
import { RootState } from '../../redux/store'
import { ArrowRightAlt, Check, CheckCircle, Person } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { FaCrown } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {

    //////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { plans }: { plans: Plan[] } = useSelector((state: RootState) => state.plan)
    console.log('plans', plans)

    //////////////////////////////////////////////// STATES ////////////////////////////////////////////////////

    //////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getPlans())
    }, [])

    //////////////////////////////////////////////// FUNCTION ////////////////////////////////////////////////////
    const handleCheckout = async (plan: Plan) => {
        try {
            const { data } = await checkoutSubscription({ planName: plan.name, billing: plan.billing })
            console.log('sessionId', data)
        }
        catch (err) {
            console.log('err in subscription ', err)
        }
    }


    const Board = ({ plan }: { plan: Plan }) => {

        const isFree = plan.name == 'FREE'
        const isBasic = plan.name == 'BASIC'
        const isPro = plan.name == 'PRO'

        return (
            <div className={`
            lg:w-[32%] sm:w-[47.5%] w-full flex flex-col gap-[8px] p-[2rem] border-[1px] border-light-gray rounded-[1rem] relative
            ${isBasic ? 'bg-main-blue text-white ' : isPro ? 'bg-white border-orange text-main-blue ' : 'bg-lighter-gray text-main-blue '}
        `}>

                {
                    isPro && <FaCrown style={{ fontSize: '64px' }} className='text-orange rotate-[45deg] absolute top-[-2rem] right-[-2rem] ' />
                }
                <div className="flex justify-between items-center">
                    <h3 className='text-text-gray text-[24px] font-medium  ' >{plan.name}</h3>
                </div>
                <div className={`
                text-[36px] font-medium 
                ${isBasic ? 'text-white ' : isPro ? 'text-main-blue ' : 'text-main-blue '}
            `} >
                    <span  >${plan.price}</span>
                    <span className={`
                    text-[1rem] font-medium ml-[8px] capitalize
                    ${isBasic ? 'text-white ' : isPro ? 'text-main-blue ' : 'text-light-gray '}
                `} >/{plan.billing}</span>
                </div>
                <div className="flex flex-col gap-[1rem] ">
                    {
                        plan.features.map((feature: any, index: number) => (
                            <div className="flex justify-start gap-[1rem] " key={index} >
                                <CheckCircle
                                    style={{ fontSize: '20px' }}
                                    className={`
                                    ${isBasic ? 'text-white ' : isPro ? 'text-orange ' : 'text-main-blue '}
                                `} />
                                <span
                                    className={`
                                    text-[16px] font-light 
                                    ${isBasic ? 'text-white ' : isPro ? 'text-main-blue ' : 'text-main-blue '}
                            `} >
                                    {feature}
                                </span>
                            </div>
                        ))
                    }
                </div>
                <button onClick={() => handleCheckout(plan)} className={`
                    border-[2px] w-full h-[50px] rounded-[8px] mt-[12px] font-bold 
                    ${isBasic ? 'bg-white text-main-blue border-white' : isPro ? 'bg-orange text-main-blue border-orange' : 'bg-white text-main-blue border-main-blue '}
                `} >Choose Plan</button>

            </div >
        )
    }

    return (
        <>

            <div className="flex flex-col gap-[2rem] md:px-[2.5rem] md:pt-[3rem] md:pb-[2rem] sm:p-6 p-4 bg-white ">
                <h2 className='flex items-center gap-[8px] font-bold text-[2rem] ' >
                    <Person style={{ fontSize: '3rem' }} />
                    <span>Plans</span>
                </h2>


                <div className="flex lg:flex-row flex-col justify-between lg:items-center items-start gap-3 lg:gap-4 border-[2px] border-light-gray rounded-[8px] lg:px-[3rem] lg:py-[2rem] sm:p-4 p-3 relative ">
                    <div className="flex flex-col justify-start md:gap-4 ">
                        <div className="flex justify-start items-center gap-2 ">
                            <span className='bg-main-blue rounded-full w-[4rem] h-[4rem] ' />
                            <div className="flex flex-col gap-2 ">
                                <div className="flex items-center h-full lg:gap-12 md:gap-8 sm:gap-6 gap-4 ">
                                    <h4 className='text-main-blue lg:text-[24px] md:text-[22px] text-[20px] font-bold ' >Premium Plan</h4>
                                    <span className='bg-green-300 border-[2px] border-green-700 text-green-700 h-fit w-fit rounded-full px-[10px] py-[2px] ' >Active</span>
                                </div>
                                <div className="hidden md:flex gap-4 ">
                                    <h4>Billing  Month</h4>
                                    <span className='md:block hidden' >|</span>
                                    <span>Next Invoice on Jul 29 for $99.9</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:hidden flex md:flex-row flex-col md:gap-[1rem] text-light-gray md:mt-0 mt-1 ">
                            <h4>Billing  Month</h4>
                            <span className='md:block hidden' >|</span>
                            <span>Next Invoice on Jul 29 for $99.9</span>
                        </div>
                    </div>
                    <div className="flex lg:w-fit w-full ">
                        <Link
                            to={'/profile/plans'}
                            className='bg-black text-white px-[2rem] py-[12px] rounded-full shadow-lg '
                        >Upgrade Plan</Link>
                    </div>
                </div>

                <div className="flex justify-start flex-wrap gap-4 w-full ">
                    {
                        plans.map((plan, index) => (
                            <Board plan={plan} key={index} />
                        ))
                    }
                </div>


            </div>

        </>
    )
}

export default page