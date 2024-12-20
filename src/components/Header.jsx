import React, { useState, useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { SiBloglovin } from "react-icons/si";
import { RxAvatar } from "react-icons/rx";
import { UserContext } from '../context/UserContext';
import { useEffect } from 'react';
import { extractUrlAndId } from '../utility/utils';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, signOutUser } = useContext(UserContext)
    console.log(user);

    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
    }, [user])

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar dark fixed="top" expand="md" style={{ borderBottom: '1px solid gray', backgroundColor: '#274046' }}>
                <NavbarBrand href="/"><SiBloglovin /></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink className="nav-link" to='/'>Főoldal</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink className="nav-link" to="/posts">Posztok</NavLink>
                        </NavItem>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem>Option 1</DropdownItem>
                                <DropdownItem>Option 2</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Reset</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    {/*authorization menu*/}

                    <Nav navbar>
                        {!user ?
                            <>
                                <NavItem>
                                    <NavLink className="nav-link" to="/auth/in">Belépés</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/auth/up">Regisztráció</NavLink>
                                </NavItem>
                            </>
                            :
                            <>
                                <NavItem>
                                    <NavLink className="nav-link" to="/"
                                        onClick={() => signOutUser()}
                                    >Kijelentkezés
                                    </NavLink>
                                </NavItem>

                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        {avatar ? <img className='myavatar' src={avatar} /> : <RxAvatar title={user.displayName} />}
                                    </DropdownToggle>
                                    <DropdownMenu end>
                                        <DropdownItem>
                                            <NavLink className='nav-link' to='/profile'>Személyes adatok</NavLink>
                                        </DropdownItem>
                                        <DropdownItem divider></DropdownItem>
                                        <DropdownItem>Fiók törlése</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
            <Outlet />
        </div>
    );
}
