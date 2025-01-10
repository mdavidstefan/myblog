import React, { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';



export const DropDown = ({ categories, setSelCateg, selcateg }) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);


    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div className="d-flex p-2">
            <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                <DropdownToggle caret

                >{selcateg ? selcateg : "Kategóriák"}</DropdownToggle>
                <DropdownMenu >
                    {categories && categories.map((obj) => <DropdownItem key={obj.id} onClick={() => setSelCateg(obj.name)} >{obj.name}</DropdownItem>)}


                </DropdownMenu>
            </Dropdown>
        </div>
    );
}



