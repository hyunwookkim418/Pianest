import React from 'react'
export default function Login() {

 const Sumbit = ()=>{

  



 }
  return (
    <div>
       <form onSubmit={()=>alert("submiited")}>
        <div>
        <label>Username of Email : </label>
        <input type="email" />
        </div>
      <div>
      <label> Password : </label>
        <input type="password" />
      </div>
      <div>
        <input type="submit" value="submit"  /> 
      </div>
       </form>
    </div>
  )
}
