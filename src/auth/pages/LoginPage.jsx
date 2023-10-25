import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink} from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'

import { AuthLayouth } from '../layout/AuthLayouth'

import { useForm } from '../../hooks'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth);

  //const isAutenticating = useMemo( () => status === 'checking', [status]);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm({
    email: 'jonathanarriazu@gmail.com',
    password: 123456
  })

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password)
    dispatch(startLoginWithEmailPassword({email, password}));
  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn')
    dispatch( startGoogleSignIn());
  }

  return (
    <AuthLayouth title='Login'>
      <form onSubmit={onSubmit}>

        <Grid container>


          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type='email'
              placeholder='correo@google.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
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
            />
          </Grid>

          <Grid 
              item 
              xs={ 12 }
              display={errorMessage ? '' : 'none'}              
            >
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>

          <Grid container spacing={ 2 } sx={{ mb:2, mt:1 }}>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
                type='submit' 
                variant='contained' 
                fullWidth
                disabled={status === 'checking'}
              >                
                Login
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
                variant='contained' 
                fullWidth
                onClick={ onGoogleSignIn }
                disabled={status === 'checking'}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={ RouterLink } color='inherit' to='/auth/register'>
              Crear una cuenta
            </Link>
          </Grid>


        </Grid>

      </form> 
    </AuthLayouth>

  )
}
