import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { InputGroup } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Error404 from "./Error404"
import { useState } from "react"
export default function Register() {

  const url = `http://localhost:3000`
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const schema = Yup.object({
  name: Yup.string().min(3).max(30).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
})

const initial = {
  name: "",
  email: "",
  password: "",
}
const submit = async (values, { setSubmitting }) => {
  try {
   const res= await axios.post(`${url}/register`, values,{ withCredentials: true })
   console.log(res.data);
   navigate("/display")
  } catch (err) {
    setError(err)
  } finally {
    setSubmitting(false)
  }
}
if (error) return <Error404 error={error} />


return(
    <div className="container">
      <h1>register</h1>
        <Formik initialValues={initial} validationSchema={schema} onSubmit={submit}>
  {({ isSubmitting }) => (
    <Form>
      {/* Fields */}
      <InputGroup className="mb-3">
        <InputGroup.Text>Name</InputGroup.Text>
        <Field type="text" name="name" className="form-control" />
      </InputGroup>
      <ErrorMessage name="name" component="div" className="text-danger" />
      
      <InputGroup className="mb-3">
        <InputGroup.Text>email</InputGroup.Text>
        <Field type="text" name="email" className="form-control" />
      </InputGroup>
      <ErrorMessage name="email" component="div" className="text-danger" />
      
      <InputGroup className="mb-3">
        <InputGroup.Text>password</InputGroup.Text>
        <Field type="text" name="password" className="form-control" />
      </InputGroup>
      <ErrorMessage name="password" component="div" className="text-danger" />
      
      <button type="submit" disabled={isSubmitting} className="btn btn-primary">Submit</button>
    </Form>
  )}
</Formik>
    </div>
)
}
