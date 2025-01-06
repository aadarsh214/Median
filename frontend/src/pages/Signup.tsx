import { Auth, Signform } from "../components/Auth"
import { Card } from "./Card"

export const Signup = () =>{
    return(
        <div className="grid grid-cols-2">
            <div className="h-screen flex flex-col justify-center">
                <Auth type={"signup"} />
                <Signform />
            </div>
            <div className="invisible md:visible">
                <Card />
            </div>
        </div>
    )
}