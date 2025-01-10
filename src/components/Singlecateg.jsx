import { RadioButtonChecked } from '@mui/icons-material'
import { RadioButtonUnchecked } from '@mui/icons-material'
import { Chip } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { useSearchParams } from 'react-router-dom'


export const Singlecateg = ({ name, selcateg, setSelCateg }) => {
    const [selected, setSelected] = useState(false)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (searchParams.get("ctg") == name) { setSelected(true) }
    }, [searchParams.get("ctg")])

    useEffect(() => {
        if (selected) {
            setSelCateg((prev) => [...prev, name])
        } else {
            setSelCateg((prev) => prev.filter((obj) => obj != name))
        }

    }, [selected])

    console.log(selcateg);

    return (
        <div>
            <Chip label={name} icon={!selected ? <RadioButtonUnchecked /> : <RadioButtonChecked />} variant="filled" onClick={() => setSelected(!selected)} style={{ backgroundColor: "rgb(255,255,255)" }} clickable />
        </div>
    )
}

