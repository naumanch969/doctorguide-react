 

import { Plan } from '../../../interfaces'
import { RootState } from '../../../redux/store'
import { Add, CheckCircle, Create, Delete, DeleteOutlined, Edit, MoreVert } from '@mui/icons-material'
import { IconButton, Menu, MenuItem } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { BsEye } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import CreatePlanModal from './CreatePlanModal'
import UpdatePlanModal from './UpdatePlanModal'
import DeletePlanModal from './DeletePlanModal'
import Loader from '../../../utils/components/Loader'
import { FaCrown } from 'react-icons/fa6'
import { getPlans } from '../../../redux/action/plan'

const Plans = () => {
    //////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////
    const dispatch = useDispatch()
    const plansPerPage = 20;
    const page = 1;
    const { plans, isFetching }: { plans: Plan[], isFetching: boolean } = useSelector((state: RootState) => state.plan)
    const initialState: Plan = {
        _id: '',
        name: '',
        billing: '',
        price: '',
        messagesPerMonth: 0,
        priceId: '',
        features: []
    }

    //////////////////////////////////////////// STATES ///////////////////////////////////////////////
    const [selectedPlan, setSelectedPlan] = useState<Plan>(initialState)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

    //////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getPlans())
    }, [])


    //////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////


    //////////////////////////////////////////// COMPONENTS ///////////////////////////////////////////////
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
                    <div className='flex gap-1 ' >
                        <IconButton onClick={() => { setOpenUpdateModal(true); setSelectedPlan(plan) }} className={`${isBasic ? 'text-white' : 'text-inherit '}`} ><Edit /></IconButton>
                        <IconButton onClick={() => { setOpenDeleteModal(true); setSelectedPlan(plan) }} className={`${isBasic ? 'text-white' : 'text-inherit '}`} ><Delete /></IconButton>
                    </div>
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
            </div >
        )
    }






    return (
        <div className='flex flex-col gap-[1.5rem] ' >

            <CreatePlanModal open={openCreateModal} setOpen={setOpenCreateModal} />
            <UpdatePlanModal open={openUpdateModal} setOpen={setOpenUpdateModal} plan={selectedPlan} />
            <DeletePlanModal open={openDeleteModal} setOpen={setOpenDeleteModal} planId={selectedPlan._id} />

            <div className="flex flex-col gap-[1rem] ">
                {/* topbar */}
                <div className="flex justify-between items-center">
                    <h1 className='text-main-blue font-bold text-[36px] ' >Plans</h1>
                    <button onClick={() => setOpenCreateModal(true)} className='flex justify-center items-center gap-4 text-[18px] md:px-[1rem] px-[12px] py-[12px] rounded-full md:w-[12rem] w-fit bg-white text-red border-[2px] border-red'>
                        <span className='hidden md:block' >Create Plan</span>  {/* for md devices */}
                        <Add className='block md:hidden' />  {/* for xs devices */}
                    </button>
                </div>
            </div>

            <div className="flex justify-start flex-wrap gap-4 w-full ">
                {
                    isFetching
                        ?
                        <div className="flex justify-center items-center w-full">
                            <Loader />
                        </div>
                        :
                        plans.map((plan, index) => (
                            <Board plan={plan} key={index} />
                        ))
                }
            </div>


        </div >
    )
}



export default Plans