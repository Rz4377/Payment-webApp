import GetProfile from "./GetProfile";

export default function Navbar(){
    
    return (
        <div className="fixed w-full flex h-13 flex-row justify-between p-1 bg-gray-500 px-6 -z-0">
            <div className="bg-black px-3 py-2 text-white rounded-md">PayWithEzz</div>

            <div className="flex flex-row ">
                <GetProfile/>
            </div>
            
        </div>
    )
}
