 

import { useState } from 'react'
import { Search } from '@mui/icons-material'
import { PiCaretRightBold, PiCaretRightLight } from 'react-icons/pi'
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import { BsSearch } from 'react-icons/bs'

const Topbar = () => {

    const [searchValue, setSearchValue] = useState<any>("")
    const [filterValue, setFilterValue] = useState<any>("")

    return (
        <div className='flex flex-col gap-[8px]  ' >

            <h2 className='text-[36px] text-main-blue font-bold flex items-center gap-[6px] ' >
                <span>Dentistry </span>
                <PiCaretRightBold style={{ fontWeight: '800', fontSize: '32px' }} />
                <span>Oral Medicine & Othology</span>
            </h2>

            <div className='flex justify-between items-center ' >
                <div className="w-[45%] relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="py-3 px-6 w-full rounded-full border focus-visible:border-light-gray focus-visible:outline-none"
                    />
                    <div className="absolute right-[1.3rem] top-1/2 -translate-y-1/2 hover:bg-[#E2E6F2] p-3 rounded-full cursor-pointer">
                        <BsSearch className="" />
                    </div>
                </div>
                <Select
                    onChange={(e) => setFilterValue(e.target.value)}
                    type="text"
                    size="small"
                    label='Sub-Category'
                    fullWidth
                    className='outline-gray-500 bg-lighter-blue flex justify-between border-[1px] border-gray-500 rounded-full w-[45%] h-[50px] px-[1rem] '
                >
                    <MenuItem value="filter1">Filter 1</MenuItem>
                    <MenuItem value="filter2">Filter 2</MenuItem>
                    <MenuItem value="filter3">Filter 3</MenuItem>
                </Select>
            </div>

        </div>
    )
}

export default Topbar