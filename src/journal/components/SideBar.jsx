import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'

export const SideBar = ({fixedWidth}) => {
  return (
    <Box
        component='nav'
        sx={{ width: { sm: fixedWidth }, flexShrink: { sm: 0 } }}
    >
        <Drawer
            variant='permanent'
            open
            sx={{ 
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: fixedWidth }
             }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    Jonathan Arriazu
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    ['Enero', 'Febrero', 'Marzo', 'Abril'].map( text => (
                        <ListItem key={ text } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={text}/>
                                    <ListItemText secondary={'lore asdasd asdasd asdasd asdasd asdasdasd asdasdasd asd'}/>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ) )
                }
            </List>
        </Drawer>
    </Box>
  )
}