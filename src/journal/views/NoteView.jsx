import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import { ImageGallery } from '../components'

export const NoteView = () => {
  return (
    <Grid container className='animate__animated animate__fadeIn animate_faster' direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>24 de octubre, 2023</Typography>
        </Grid>
        <Grid item>
            <Button color='primary' sx={{ p: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                placeholder='Ingrese un título'
                label='Título'
                sx={{ border: 'none', mb: 1 }}
            />

            <TextField 
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='¿Que sucedió en el día de hoy?'
                minRows={ 5 }
            />
        </Grid>

        {/* Image gallery */}
        <ImageGallery />

    </Grid>
  )
}
