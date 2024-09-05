import FrontPage from "./FrontPage";
import Navbar from "./NavBar";

export default function Layout() {
    return (
        <div className="flex flex-col h-screen w-screen text-black">
            <div className="sticky top-0 z-20 bg-white shadow-md">
                <Navbar />
            </div>

            <div className=" my-16 h-full p-6 text-xl font-bold ">
                <FrontPage />
            </div>
        </div>
    );
}