import { Balance, FirstName, Username } from "../DynamicValues";

export default function Profile() {

    return (
      <div className="relative group mx-3 inline-block">

        <div className="w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
  
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-4 w-64 bg-gray-800 border border-gray-600 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <div className="text-white">
            <div className="text-xl font-bold text-indigo-400 flex justify-center"><FirstName/></div>
            <div className="mt-2 px-2">
                <span className="text-teal-400">Email:</span> <Username />
            </div>
            <div className="mt-1 px-2">
                <span className="text-teal-400">Balance:</span> <Balance/>
            </div>
            </div>
        </div>
      </div>
    );
  }
  