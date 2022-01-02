import { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


function App() {
  const initialValues = {username : "", email : "", password: "", password2: ""}
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({password : false, email : false, username: false})


  const handleChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name] : value})
  }
  
  useEffect(() => {
    setFormErrors(validation(formValues));
  }, [formValues]);


  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.keys(formErrors).length === 0) {
      fetch("https://jsonblob.com/api/jsonBlob/", {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  body: JSON.stringify({
    email: formValues.email ,
    username : formValues.username,
    password: formValues.password
  })
})
.then( (response) => { 
   if (response.status === 201) {
    toast.success('Nalog je uspjesno kreiran')
   } else {
     toast.error('Doslo je do greske')
   }
});

    }
  }


  const validation  = (values) => {
    const errors = {}
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line
    const regexUser = /^(?=[a-zA-Z0-9._]{6,12}$)/
    const regexPass = /^(?=.{8,})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/;
    if (!values.username) {
      errors.username = "UserName je obavezan!"
    } else if (!regexUser.test(values.username)) {
      errors.username = "UserName mora imati min 6 a max 12 karaktera !"
    }
    if (!values.email) {
      errors.email = "Email je obavezan!"
    } else if (!regexEmail.test(values.email)) {
      errors.email = "Email adresa nije validna!"
    }
    if (!values.password) {
      errors.password = "Password je obavezan!"
    } else if (!regexPass.test(values.password)) {
      errors.password = "Sifra mora sadrzati: veliko slovo, malo slovo, specijalni karakter i broj"
    }
    if (!values.password2) {
      errors.password2 = "Konfirmacija passworda je obavezna"
    } else if (values.password2 !== values.password) {
      errors.password2 = "Passwordi se ne poklapaju"
    }
    return errors
  }

  return (
  <div className="App">
    <div className="form-wrap">
      <div className="content">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h3>Registracija</h3>
            <input 
            type="email" 
            className="input" 
            id={formErrors.email ? 'errorInput' : ''} 
            name="email" 
            placeholder="Email" 
            value={formValues.email} 
            onChange={handleChange}
            autoComplete='off' />
            <p className='errorText'>{formErrors.email}</p>
            <input 
              type="text" 
              className="input" 
              id={formErrors.username ? 'errorInput' : ''}
              name="username" 
              placeholder="UserName" 
              value={formValues.username}
              onChange={handleChange}
              autoComplete='off' />
            <p className='errorText'>{formErrors.username}</p>
            <input 
              type="password" 
              className="input" 
              id={formErrors.password ? 'errorInput' : ''}
              name="password" 
              placeholder="Password" 
              value={formValues.password}
              onChange={handleChange}/>
            <p className='errorText'>{formErrors.password}</p>
            <input 
              type="password" 
              className="input" 
              id={formErrors.password2 ? 'errorInput' : ''}
              name="password2" 
              placeholder="Confirm password" 
              value={formValues.password2}
              onChange={handleChange}
              />
            <p className='errorText'>{formErrors.password2}</p>
            <input type="submit" className="button" value="Sign Up" />
          </form>
      </div>
    </div>

    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
  </div>
  );
}

export default App;
