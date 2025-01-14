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
import { UserContext } from '../context/UserContext';
import { useEffect } from 'react';
import { extractUrlAndId } from '../utility/utils';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import QrCodeSharpIcon from '@mui/icons-material/QrCodeSharp';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, signOutUser } = useContext(UserContext)
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
        !user && setAvatar(null)
    }, [user, user?.photoURL])

    const toggle = () => setIsOpen(!isOpen);

    return (

        <div>
            <div>
                <Navbar dark fixed="top" expand="md" style={{ borderBottom: '3px solid gray', backgroundColor: '#274046' }}>
                    <NavbarBrand href="/"><QrCodeSharpIcon /></NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem>
                                <NavLink className="nav-link" to='/'>Főoldal</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink className="nav-link" to="/posts">Posztok</NavLink>
                            </NavItem>

                            {user &&
                                <NavLink to="create" className="nav-link">
                                    Új poszt
                                </NavLink>
                            }

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
                                            {avatar ? <img id='myavatar' src={avatar} /> : <AccountCircleSharpIcon title={user.displayName} />}
                                        </DropdownToggle>
                                        <DropdownMenu end>
                                            <DropdownItem>
                                                <NavLink className='nav-link' to='/profile' style={{color: 'black'}}>Személyes adatok</NavLink>
                                            </DropdownItem>

                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
                <Outlet />
            </div>
        </div>
    );
}
