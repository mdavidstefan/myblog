import { RadioButtonChecked } from '@mui/icons-material'
import { RadioButtonUnchecked } from '@mui/icons-material'
import { Chip } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'


export const Singlecateg = ({ name, selcateg, setSelcateg }) => {
    const [selected, setSelected] = useState(false)
    const [searchParams] = useSearchParams()



    useEffect(() => {
        if (searchParams.get("ctg") == name) { setSelcateg(true) }
    }, [searchParams.get("ctg")])

    useEffect(() => {
        if (selected) {
            setSelcateg((prev) => [...prev, name])
        } else {
            setSelcateg((prev) => prev.filter((obj) => obj != name))
        }

    }, [selected])

    console.log(selcateg);

    return (
        <div>
            <Chip label={name} icon={!selected ? <RadioButtonUnchecked /> : <RadioButtonChecked />} variant="filled" onClick={() => setSelected(!selected)} style={{ backgroundColor: "rgb(255,255,255)" }} clickable />
        </div>
    )
}

