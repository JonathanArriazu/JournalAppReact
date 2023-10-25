import { Box } from '@mui/material'
import React from 'react'
import { NavBar } from '../components';

const fixedWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
        {/* Navbar sidebarWidth*/}
        <NavBar fixedWidth={ fixedWidth }/>
        {/* Sidebar sidebarWidth*/}
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            {/* Toolbar */}
            {children}
        </Box>
    </Box>
  )
}
