import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { startlogout } from '../../store/auth/thunks'

export const NavBar = ({ fixedWidth = 240}) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startlogout());
    }

  return (
    <AppBar
        position='fixed'
        sx={{
            width: { sm: `calc(100% - ${fixedWidth}px)` },
            ml: { sm: `${fixedWidth}px`}
        }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge='start'
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'>JournalApp</Typography>
                <IconButton onClick={onLogout}>
                    <LogoutOutlined color='error'/>
                </IconButton>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}
