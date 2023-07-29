const uservalidation=(values)=>{
    let errors={}
    const validPhone=new RegExp('[0-9]{10,10}')
    if(!values.name){
        errors.name="Name is required"
    }
    if(!values.city){
        errors.city="City is required"
    }
    if(!values.userid){
        errors.userid="Email id is required"
    }
    if(!values.phone)
    {
        errors.phone="Phone no is required"  
    }
    if(!validPhone.test(values.phone)){
        errors.phone="Enter a valid phone number"
    }
    if(!values.pwd){
        errors.pwd="Password is required"
    }
    if(!values.cpwd){
        errors.cpwd="Confirm password is required"
    }
    
    if(values.pwd && values.cpwd && values.pwd!==values.cpwd){
        errors.cpwd="Password not match"
    }

    return errors;
    if(values.phone != 10)
    {
        errors.phone="minium 10 digit phone no is required"
       
    }
    return errors;
}

export default uservalidation;