

import { Rocket } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../../redux/action/user'
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from 'recharts'

const Usage = () => {

    ////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////
    const dispatch = useDispatch()
    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
        }
    ]
    ////////////////////////////////////////////////// STATES /////////////////////////////////////////////////

    ////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getUser())
    }, [])

    ////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////


    return (
        <>

            <div className="flex flex-col gap-[2rem] md:px-[2.5rem] md:pt-[3rem] md:pb-[2rem] sm:p-6 p-4 bg-white ">
                <h2 className='flex items-center gap-[8px] font-bold text-[2rem] ' >
                    <Rocket />
                    <span>Message Usage</span>
                </h2>

                <div className="flex flex-col gap-[12px] ">
                    <span className='text-main-blue font-medium ' >50 out of 10,000 Messages Used</span>
                    <div className="w-full bg-lighter-gray rounded-full h-[2rem] flex justify-start ">
                        <div style={{ width: '30%' }} className="bg-red rounded-full h-full " />
                    </div>
                </div>

                <div className="graph">

                    <LineChart
                        width={730}
                        height={250}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                    </LineChart>


                </div>

            </div>

        </>
    )
}

export default Usage