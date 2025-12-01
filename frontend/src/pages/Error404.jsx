import {Alert,Card} from "react-bootstrap"
export default function Error404({error}) {
  return (
         <Card style={{ width: '60rem' }}>
    <Alert key='danger' variant='danger' style={{textAlign: "center", padding: "60px"}}>
      <h1>404</h1>
      <p>Page not found</p>
      <p>{error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      "Something went wrong"}</p>
 
    </Alert>
      </Card>
  );
}


