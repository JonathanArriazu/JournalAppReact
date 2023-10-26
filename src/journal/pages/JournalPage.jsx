import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView } from '../views'
import { NoteView } from '../views'
import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import { startNewNote } from '../../store/journal/thunks'
import { useDispatch, useSelector } from 'react-redux'

export const JournalPage = () => {

  const dispatch = useDispatch();
  const {isSaving, active} = useSelector(state => state.journal)

  const onClickNewNote = () => {

    dispatch(startNewNote());
    //No le pasamos el uid porque aprovechamos que ya lo tenemos almacenado en el store

  }

  return (
    <JournalLayout>

      {
        (!!active) 
        ? <NoteView />
        : <NothingSelectedView />
      }
      

      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.8 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>

    </JournalLayout>
  )
}
