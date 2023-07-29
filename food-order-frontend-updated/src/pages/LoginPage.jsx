import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { apiRequest } from "../libs/request"
import loginvalidation from '../validations/loginvalidation'
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginPage(){
    const dispatch=useDispatch()
    const [user,setUser]=useState({
        "userid":"",
        "pwd":""
    })
   
    const [submitted,setSubmitted]=useState(false)
    const [errors,setErrors]=useState({})
    const [errmsg,setErrmsg]=useState()
    const navigate=useNavigate()

    const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit=e=>{
        e.preventDefault()
        setErrors(loginvalidation(user))    
        setSubmitted(true)
    }

    useEffect(()=>{
        console.log(errors)
        if(Object.keys(errors).length===0 && submitted){
            console.log(user)
            apiRequest.post("admin/validate",user)
            .then(resp=>{
                let result=resp.data.data;
                console.log(resp.data.data)
                sessionStorage.setItem("userid",result.userid)
                sessionStorage.setItem("uname",result.uname)
                sessionStorage.setItem("role",result.role)
                sessionStorage.setItem("id",result.id)
                dispatch({type:'IsLoggedIn'})
                navigate("/")
            })
            .catch(error=>{
                console.log("Error",error);
                setErrmsg("Invalid username or password..!!")
            })            
        }
    },[errors])


    return (
    <div className="container">
            <div className="card shadow bg-light mt-2  text-black">
        <div className="card-body">
        <div className="row">
            <div className="col-sm-4  mx-auto ">
                <h4 className="text-center p-2 ">
                    Login Form
                </h4>
                <form onSubmit={handleSubmit}>                 
                <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">Email Id</label>
                    <div className="col-sm-8">
                        <input type="text" placeholder="Enter the Email Id" name="userid" value={user.userid} onChange={handleInput} className="form-control" />
                        {errors.userid && <small className="text-danger float-right">{errors.userid}</small>}
                    </div>
                    
                </div>                    
                <div className="form-group form-row">
                    <label className="col-sm-4 form-control-label">Password</label>
                    <div className="col-sm-8">
                        <input type="password" placeholder="Enter the Password"name="pwd" value={user.pwd} onChange={handleInput} className="form-control" />
                        {errors.pwd && <small className="text-danger float-right">{errors.pwd}</small>}
                    </div>
                    </div>  
                                  
                <button className="btn btn-primary float-right shadow mb-5 bg-body-tertiary rounded">Login Now</button>
                </form>
                <div className="clearfix"></div>
                {errmsg && <p className="alert alert-danger mt-4 text-center font-weight-bold">{errmsg}</p>}
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

            </div>
        </div>
    </div>
    </div>
    </div>
    );
}