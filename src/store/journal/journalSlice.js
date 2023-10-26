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
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => { // AGREGAR
            //Agrego la nueva nota que viene en el payload al notes del initial state
            state.notes.push( action.payload);
            //Luego de esto, cambio el estado de isSaving a "false"
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            //El payload es la nota que quiero ver en pantalla
            state.active = action.payload
            //Con esto, el active pasa de null a un active donde se mostrara toda la info de la nota
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
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateeNote,
    deleteNoteById
 } = journalSlice.actions;