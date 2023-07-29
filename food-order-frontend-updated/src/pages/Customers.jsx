import { useEffect, useState } from "react";
import { apiRequest } from "../libs/request";

function Customers(){
    const [customers,setCustomers]=useState([])
    useEffect(()=>{
        apiRequest.get("customers")
        .then(resp=>{
            setCustomers(resp.data)
            console.log(customers)
        })
    },[])
    
    return (
        <div className="container-fluid">
            <h4 className="text-dark p-2 text-center">All Customers</h4>
            <table className="table table-bordered table-light table-striped table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email Id</th>
                    
                        <th>Gender</th>
                        <th>Phone no</th>
                        {/* <th>Password</th> */}
                    </tr>
                </thead>
                <tbody>
                {customers.map(x=>(
                    <tr key={x.id}>
                        <td>{x.name}</td>
                       
                        <td>{x.userid}</td>
                        <td>{x.gender}</td>
                        <td>{x.phone}</td>
        
                        {/* <td>{x.pwd}</td> */}
                    </tr>
                ))}
                </tbody>
            </table>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default Customers;