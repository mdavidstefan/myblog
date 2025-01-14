import React from 'react'
import { useContext } from 'react'
import { CategContext } from '../context/CategContext'
import { Singlecateg } from './Singlecateg'

export const Categories = ({ selcateg, setSelCateg }) => {

    const { categories } = useContext(CategContext)

    const HandleChange = (event) => {
        const { value, checked } = event.target
        setSelCateg((prev) => checked ? [...prev, value] : prev.filter((categ) => categ != value))
        console.log(selcateg);

    }

    return (
        <div className='responsivediv' id='categoryselector'>
            {categories && categories.map((obj) => <Singlecateg selcateg={selcateg} setSelCateg={setSelCateg} name={obj.name} />)}
        </div>
    )
}

