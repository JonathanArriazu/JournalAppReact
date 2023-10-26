import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
       isSaving: false,
       messageSaved: '',
       notes: [],
       active: null
       /* active: {
        id: 'ABC123',
        title: '',
        body: '',
        date: 1234567,
        imageUrls: [] //Arreglo de urls
       } */
    },
    reducers: {
        addNewEmptyNote: (state, action) => { // AGREGAR
            //Agrego la nueva nota que viene en el payload al notes del initial state
            state.notes.push( action.payload);
            //Luego de esto, cambio el estado de isSaving a "false"
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {

        },
        setNotes: (state, action) => {

        },
        setSaving: (state) => { // => solo tiene state porque lo unico que queremos es colocarlo en true

        },
        updateeNote: (state, action) => { //ACTUALIZAR

        },
        deleteNoteById: (state, action) => { //ELIMINAR

        },
    }
});

export const { 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateeNote,
    deleteNoteById
 } = journalSlice.actions;