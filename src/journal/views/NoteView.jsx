import { SaveOutlined } from '@mui/icons-material'
import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startSaveNotes } from '../../store/journal/thunks'
import Swal from 'sweetalert2'

export const NoteView = () => {

    const dispatch = useDispatch();

    const {active: note, messageSaved} = useSelector(state => state.journal); // active ahora va a ser conocida como note

    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(()=> {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])

    //Actualizo la nota activa con el nuevo formState, cada vez que cambie el formState
    useEffect(() => {
        dispatch( setActiveNote(formState) )
    }, [formState])

    const onSaveNote = () => {
        dispatch(startSaveNotes());
    }

    useEffect(() => {
        if ( messageSaved.length > 0 ) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }
      }, [messageSaved])
    

  return (
    <Grid container className='animate__animated animate__fadeIn animate_faster' direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{dateString}</Typography>
        </Grid>
        <Grid item>
            <Button 
                color='primary' 
                sx={{ p: 2 }}
                onClick={onSaveNote}
            >
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
                name='title'
                value={title}
                onChange={onInputChange}
            />

            <TextField 
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='¿Que sucedió en el día de hoy?'
                minRows={ 5 }
                name='body'
                value={body}
                onChange={onInputChange}
            />
        </Grid>

        {/* Image gallery */}
        <ImageGallery />

    </Grid>
  )
}
