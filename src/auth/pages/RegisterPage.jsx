import { Link as RouterLink} from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'

import { AuthLayouth } from '../layout/AuthLayouth'
import { useForm } from '../../hooks'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks'

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email:[ (value) => value.includes('@'), 'El correo no es válido'],
  password:[ (value) => value.length >= 6, 'El password debe de tener más de 6 letras'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false)

  const {status, errorMessage} = useSelector( state => state.auth)
  
  const { displayName, email, password, onInputChange, formState,
          displayNameValid, emailValid, passwordValid, isFormValid
  } = useForm(formData, formValidations);

  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return

    dispatch( startCreatingUserWithEmailPassword(formState) );
  }

  return (
    <AuthLayouth title='Registro'>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>

        <Grid container>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              label="Nombre completo"
              type='text'
              placeholder='Ingrese su nombre'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type='password'
              placeholder='Contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb:2, mt:1 }}>
            <Grid 
              item 
              xs={ 12 }
              display={errorMessage ? '' : 'none'}              
            >
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>
            <Grid item xs={ 12 }>
              <Button 
                type='submit' 
                variant='contained' 
                fullWidth
                disabled={status === 'checking'}
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}> ¿Ya tienes cuenta? </Typography>
            <Link component={ RouterLink } color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>


        </Grid>

      </form> 
    </AuthLayouth>

  )
}

