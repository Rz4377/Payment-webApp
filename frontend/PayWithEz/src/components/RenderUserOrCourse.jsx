import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { getUsersList, setToAtom } from "./atoms/atomVariables";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function RenderUsers({ searchFilter, renderUser }) {
  const userList = useRecoilValueLoadable(getUsersList(searchFilter));
  const setTo = useSetRecoilState(setToAtom);
  const navigate = useNavigate();

  if (userList.state === "loading") {
    return <div>Loading...</div>;
  }

  if (userList.state === "hasError") {
    return <div>Error: {userList.contents.message}</div>;
  }

  if (userList.state === "hasValue") {
    const handleSetToValue = (userId) => {

      try{
        if(!userId) throw "userId invalid";
        setTo(userId);
      }
      catch(error){
        console.log(error)
      }
      navigate("/transfer")
    };

    return (
      <div className="flex flex-row">
        {renderUser ? (
          <div className="w-full bg-slate-200">
            {userList.contents.map((user) => (
              <div
                key={user.userId}
                className="mx-4 mt-4 flex flex-row justify-between"
              >
                <div>
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-600 text-white rounded-full">
                    {user.username[0].toUpperCase()}
                  </span>
                  <span className="mx-3">{user.firstName}</span>
                </div>
                <Button
                  onClick={() => handleSetToValue(user.userId)}
                  heading={"Send Money"}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full bg-slate-400">
            {userList.contents.map((user) => (
              <div
                key={user.userId} 
                className="mx-4 mt-4 flex flex-row justify-between"
              >
                <div>
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-600 text-white rounded-full">
                    {user.username[0].toUpperCase()}
                  </span>
                  <span className="mx-3">{user.firstName}</span>
                </div>
                <Button heading={"Buy Course"} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null; 
}
