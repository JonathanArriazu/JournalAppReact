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

            state.messageSaved= '';
        },
        setNotes: (state, action) => {
            //Establezco las notas que traemos de firebase DB y las colocamos en notes del state
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved= '';
        },
        updateNote: (state, action) => { //ACTUALIZAR
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                //el action.payload es la nota actualizada

                //si el id almacenado en el array de notes es igual al id de la nota actualizada
                // voy a actualizar esa id por el action.payload
                if (note.id === action.payload.id) {
                    return action.payload;
                }

                return note;
            });

            //Cuando la nota se actualiza, muestro mensaje
            state.messageSaved = `${action.payload.title}, actualizada correctamente`;

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
    updateNote,
    deleteNoteById
 } = journalSlice.actions;