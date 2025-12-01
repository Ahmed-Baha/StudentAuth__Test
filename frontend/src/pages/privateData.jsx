import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"


export default function PrivateData(){
          const url = `http://localhost:3000`
    const [privateData,setPrivateData]=useState('')
     useEffect(()=>{ axios.get(`${url}/privateData`,{withCredentials:true}).then((res)=>{
        setPrivateData(res.data)
    console.log('this renderd')}
    ).catch((e)=>console.log(e))}
    )
  
    return(
        <div>
            {privateData}
        </div>
    )
}