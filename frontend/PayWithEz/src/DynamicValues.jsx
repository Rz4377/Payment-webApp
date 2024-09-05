
import { useRecoilValueLoadable } from "recoil";
import { balanceState, userInfo } from "./components/atoms/atomVariables";

export function FirstName(){
    const firstName = useRecoilValueLoadable(userInfo);
    switch (firstName.state) {
        case 'hasValue':
          return <div>{firstName.contents.firstName}</div>;
        case 'loading':
          return <div>Loading...</div>;
        case 'hasError':
          throw firstName.contents;
    }
}

export function Username(){
    const username = useRecoilValueLoadable(userInfo);
    switch (username.state) {
        case 'hasValue':
          return <>{username.contents.username}</>;
        case 'loading':
          return <>Loading...</>;
        case 'hasError':
          throw username.contents;
    }
}

export function Balance(){
    const balance = useRecoilValueLoadable(balanceState);
    switch (balance.state) {
        case 'hasValue':
          return <>{balance.contents}</>;
        case 'loading':
          return <>Loading...</>;
        case 'hasError':
          throw balance.contents;
    }
}