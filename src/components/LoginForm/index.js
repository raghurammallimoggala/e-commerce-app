import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
function LoginForm(){
    const [username,setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [errorMsg,setErrorMsg]=useState(null);
    const navigate= useNavigate();

    const loginSuccess=(jwtToken)=>{
        Cookies.set("jwt_token", jwtToken, { expires: 30 });
        navigate("/")
    }

    const loginFailed=(errorMsg)=>{
         setErrorMsg(errorMsg)
    }
     
const onSubmitForm=async(e)=>{
    e.preventDefault()
    const userDetails={username, password}
    const url="https://apis.ccbp.in/login"
    const options={
        method:"POST",
        body:JSON.stringify(userDetails)
    }
    const response=await fetch(url,options)
    const data=await response.json()
    if(response.ok === true){
        loginSuccess(data.jwt_token);
    }else{
        loginFailed(data.error_msg);
    }

}

   const renderUsernameField=()=>{
    
         return(
            <>
            <label className="text-[#475569] font-medium text-sm" htmlFor="username">USERNAME</label>
            <input
            type="text"
            id="username"
            className="bg-[#d7dfe9] p-2 rounded outline-none "
            placeholder="Enter Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
            </>
         )
    }


    const renderPasswordField=()=>{
        return(
            <>
           <label className="text-[#475569] font-medium text-sm" htmlFor="password">PASSWORD</label>
           <input
           type="password"
           id="password"
           className="bg-[#d7dfe9] p-2 rounded outline-none"
           placeholder="Enter Password"
           value={password}
           onChange={(e)=>setPassword(e.target.value)}/>
            </>
        )
    }

    return(
        <div className="flex lg:flex-row sm:flex-col justify-center items-center h-screen gap-20 ">
            <img className="lg:hidden sm:w-[150px] sm:mt-[20px] flex flex-col " src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="website logo"/>
            <img className="w-[500px] md:block sm:hidden"src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png" alt="website login"/>
            <form className="bg-white rounded-md shadow-custom-3 w-[350px] h-[400px] flex flex-col justify-center items-center" onSubmit={onSubmitForm}>
                <img className="w-[200px] mb-[50px]" src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="website logo"/>
                <div className="flex flex-col gap-1 w-[80%] mb-[20px]">
                    {renderUsernameField()}
                </div>
                <div className="flex flex-col gap-1 w-[80%] mb-[20px]">{renderPasswordField()}</div>
                <button type="submit" className="bg-[#0b69ff] w-[80%] mb-[20px] p-2 rounded">Login</button>
                {errorMsg && <p className="text-[#ff0b37]">{errorMsg}</p>}
            </form>
        </div>
    )
}
export default LoginForm;