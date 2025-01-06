import { Link } from "react-router-dom"

export const Auth = ({type} : { type: "signup" | "signin" }) =>{
    return <div className="h-screen flex flex-col justify-center">
        <div>
        <div className="flex font-bold justify-center text-5xl">
            Create an account
        </div>
        <div className="mt-4 flex justify-center text-gray-600">
            Already have an account? 
            <Link className="pl-2 text-blue-600" to={"/Signin"}>Login</Link>
        </div>
        </div>
    </div>
}


export const Signform = () =>{
    return <div className="space-y-2">
        <label>email</label>
        <input type="text" placeholder="email" />
    </div>
}