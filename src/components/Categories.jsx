import React from 'react'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { Chip } from '@mui/material'
import { useState } from 'react'
import { RadioButtonUnchecked } from '@mui/icons-material'
import { RadioButtonChecked } from '@mui/icons-material'
import { middleStyle } from '../utility/utils'
import { Singlecateg } from './Singlecateg'

export const Categories = ({ selcateg, setSelCateg }) => {

    const { categories } = useContext(CategContext)

    const HandleChange = (event) => {
        const { value, checked } = event.target
        setSelCateg((prev) => checked ? [...prev, value] : prev.filter((categ) => categ != value))
        console.log(selcateg);

    }

    return (
        <div className='categoryselector'>
            {categories && categories.map((obj) => <Singlecateg selcateg={selcateg} setSelCateg={setSelCateg} name={obj.name} />)}
        </div>
    )
}

