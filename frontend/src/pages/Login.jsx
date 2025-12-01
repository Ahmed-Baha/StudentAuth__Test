import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from "react-router-dom"
import Error404 from "./Error404"
import { useState } from "react"
import axios from "axios"
import { InputGroup } from "react-bootstrap"



export default function Login(){
      const url = `http://localhost:3000`
      const navigate = useNavigate()
      const [error, setError] = useState("")
    const submit= async (values, { setSubmitting }) => {
         try{
            const res = await axios.post(`${url}/login`,values,{ withCredentials: true })
            console.log(res.data);
            navigate('/display')
            
        
        }catch(err){setError(err)}finally{setSubmitting(false)}
       }
       if (error) return <Error404 error={error}/>
    return(
        <div className='container'>
  <h1>login</h1>
     <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={submit}
     >
       {({ isSubmitting }) => (
         <Form>
      
      <InputGroup className="mb-3">
        <InputGroup.Text>email</InputGroup.Text>
        <Field type="text" name="email" className="form-control" />
      </InputGroup>
      <ErrorMessage name="email" component="div" className="text-danger" />
           <InputGroup className="mb-3">
        <InputGroup.Text>password</InputGroup.Text>
        <Field type="text" name="password" className="form-control" />
      </InputGroup>
      <ErrorMessage name="name" component="div" className="text-danger" />
           <button type="submit" disabled={isSubmitting} className="btn btn-primary">Submit</button>
         </Form>
       )}
     </Formik>
        </div>
    )
}