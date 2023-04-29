import React, {useEffect, useState} from 'react';
import {invoke} from "@tauri-apps/api";

interface IResponse<T> {
    message: string,
    code: number;
    data: T;
}

const App = () => {
    const [message, setMessage] = useState('');


    async function sayHi() {
        const msg = await invoke('say_hi') as string;
        setMessage(msg);
    }


    const [name, setName] = useState('');
    const [msgWithName, setMsgWithName] = useState('');

    async function sayHiWithName() {
        try {
            const msg = await invoke('say_hi_to', {name}) as string;
            setMsgWithName(msg);
        } catch (e) {
            setMsgWithName(e as string)
        }
    }


    const [customCmdResponse, setCustomCmdResponse] = useState<IResponse<number>>({} as IResponse<number>);
    const [count, setCount] = useState(0);

    async function sayAsync(number: number) {
        try {
            const res = await invoke<IResponse<number>>('my_cmd', {
                number,
            })
            console.log(res)
            setCustomCmdResponse(res)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div>
                <h1>{message}</h1>
                <button onClick={sayHi}>Say Hi</button>
            </div>
            <div>
                <input placeholder="Name" onChange={e => setName(e.target.value)}/>
                <button onClick={sayHiWithName}>Say Hi</button>
                <p>{msgWithName}</p>
            </div>
            <div>
                <h1>{customCmdResponse.message}</h1>
                <h1>{customCmdResponse.code}</h1>
                <h1>{customCmdResponse.data}</h1>
                <button onClick={async () => {
                    await sayAsync(count)
                    setCount(count + 1)
                }}>Say Async
                </button>
            </div>
        </>
    );
};

export default App;
