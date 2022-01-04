import React from 'react'
import {useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'

function AddPost() {
 const navigate = useNavigate()

  const initialValues = {title : "", imgUrl : "", description: "", author: ""}
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({description : false, title : false, imgUrl: false})
  const [posts,setPosts] = useState({})
  useEffect(() => {
    fetch("https://jsonblob.com/api/jsonblob/927636205148061696", {
      method: 'get',
      headers: {
        "Accept": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch((error) => {
        console.error('Error:', error);
    });
  }, [])

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormValues({...formValues, [name] : value})
  }
  
  useEffect(() => {
    setFormErrors(validation(formValues));
  }, [formValues]);


  const handleSubmit = (e) => {
    e.preventDefault()
    const data = [...posts,{title: formValues.title ,
      author : formValues.author,
      description: formValues.description,
      image : formValues.imgUrl,
      id : posts.length+1}]
    if (Object.keys(formErrors).length === 0) {
      fetch("https://jsonblob.com/api/blob/927636205148061696", {
  method: "PUT",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  body: JSON.stringify(data)
})
.then( (response) => { 
   if (response.status === 201 || response.status === 200) {
    toast.success('Nova objava je uspjesno dodata!')
    navigate('/')
   } else {
     toast.error('Doslo je do greske')
   }
});

    }
  }


  const validation  = (values) => {
    const errors = {}
    const regexDescription = /^(?=[a-z A-Z 0-9._]{1,255}$)/
    const regexTitle = /^(?=[a-z A-Z 0-9._]{1,20}$)/
    const regexAuthor = /^(?=[a-z A-Z 0-9._]{1,20}$)/
    if (!values.title) {
      errors.title = "Naslov objave je obavezan!"
    } else if (!regexTitle.test(values.title)) {
      errors.title = "Naslov moze imati max 20 karaktera !"
    }
    if (!values.description) {
      errors.description = "Opis je obavezan!"
    } else if (!regexDescription.test(values.description)) {
      errors.description = "Opis moze imati max 255 karaktera!"
    }
    if (!values.imgUrl) {
      errors.imgUrl = "Link slike je obavezan!"
    } 
    if (!values.author) {
      errors.author = "Ime autora je obavezna"
    } else if (!regexAuthor.test(values.author)) {
      errors.author = "Ime autora moze imati max 20 karaktera"
    }
    return errors
  }

  return (
    <div className='container'>
      
      <div className="row">
      <div className="col s8 offset-s2">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h4>Add new post</h4>
            <input 
            type="text"  
            name="title" 
            placeholder="Title" 
            value={formValues.title} 
            onChange={handleChange}
            autoComplete='off' />
            {formErrors.title && <span className="helper-text red-text" data-error="wrong" data-success="right">{formErrors.title}</span>}
            <input 
              type="text" 
              name="imgUrl" 
              placeholder="imgUrl" 
              value={formValues.imgUrl}
              onChange={handleChange}
              autoComplete='off' />
             {formErrors.imgUrl && <span className="helper-text red-text" data-error="wrong" data-success="right">{formErrors.imgUrl}</span>}
            <textarea  
              className="materialize-textarea"
              id={formErrors.description ? 'errorInput' : ''}
              name="description" 
              rows={3}
              placeholder="Description" 
              value={formValues.description}
              onChange={handleChange}>
            </textarea>
            {formErrors.description && <span className="helper-text red-text" data-error="wrong" data-success="right">{formErrors.description}</span>}
            <input 
              type="text"  
              id={formErrors.author ? 'errorInput' : ''}
              name="author" 
              placeholder="Author" 
              value={formValues.author}
              onChange={handleChange}
              />
            {formErrors.author && <span className="helper-text red-text" data-error="wrong" data-success="right">{formErrors.author}</span>}
            <div className='row'>
            <button className="btn waves-effect waves-light" type="submit">Submit
              <i class="material-icons right">send</i>
            </button>
            </div>
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
  )
}

export default AddPost
