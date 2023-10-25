import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { NavBar, SideBar } from '../components';

const fixedWidth = 280;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
        {/* Navbar sidebarWidth*/}
        <NavBar fixedWidth={ fixedWidth }/>
        {/* Sidebar sidebarWidth*/}
        <SideBar fixedWidth={ fixedWidth }/>
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            {children}
        </Box>
    </Box>
  )
}
