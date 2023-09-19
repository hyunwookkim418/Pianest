import React from 'react'
export default function Login() {

 const Submit = ()=>{


 }
  return (
    <div>
       <form onSubmit={()=>alert("submitted")}>
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
