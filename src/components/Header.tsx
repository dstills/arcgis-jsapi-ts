// src/components/HeaderComponent.tsx

import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap'
import '../styles/Header.scss'

interface HeaderProps {
    onToggleToolbar: () => void
    isToolbarActive: boolean
}

const HeaderComponent: React.FC<HeaderProps> = ({ onToggleToolbar, isToolbarActive }) => {
    return (
        <Navbar color='dark' expand='md' className="header">
            <NavbarBrand href='/'>Maplibre with React + TypeScript + Webpack</NavbarBrand>
            <Nav className='ml-auto' navbar>
                <NavItem>
                    <Button color={isToolbarActive ? 'danger' : 'success'} onClick={onToggleToolbar}>{isToolbarActive ? "Close Toolbar" : "Open Toolbar"}</Button>
                </NavItem>
            </Nav>
        </Navbar>
    )
}

export default HeaderComponent