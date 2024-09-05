import React, { useState } from "react";
import RenderUsers from "./RenderUserOrCourse";

export default function ToggleDivs({ searchFilter }) {
  const [isFirst, setIsFirst] = useState(true);
  const [renderUser, setRenderUser] = useState(true);

  const handleToggle = (boolVal) => () => {
    setIsFirst((prev) => !prev); 
    setRenderUser(boolVal); 
  };

  return (
    <>
      <div className="flex flex-row">
        {isFirst ? (
          <>
            <div className="w-1/2 py-4 flex justify-end" onClick={handleToggle(true)}>
              <div className="w-1/4 rounded bg-slate-200 p-2 flex justify-center cursor-pointer transition-transform duration-2000 ease-in-out">
                Send Money
              </div>
            </div>

            <div className="w-1/2 py-4 flex justify-start" onClick={handleToggle(false)}>
              <div className="w-1/4 rounded bg-slate-400 p-2 flex justify-center cursor-pointer transition-transform duration-2000 ease-in-out">
                Buy Course
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-1/2 py-4 flex justify-end" onClick={handleToggle(false)}>
              <div className="w-1/4 rounded bg-slate-400 p-2 flex justify-center cursor-pointer transition-transform duration-2000 ease-in-out">
                Buy Course
              </div>
            </div>

            <div className="w-1/2 py-4 flex justify-start" onClick={handleToggle(true)}>
              <div className="w-1/4 rounded bg-slate-200 p-2 flex justify-center cursor-pointer transition-transform duration-2000 ease-in-out">
                Send Money
              </div>
            </div>
          </>
        )}
      </div>
      <RenderUsers searchFilter={searchFilter} renderUser={renderUser} />
    </>
  );
}
