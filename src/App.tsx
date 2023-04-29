import React, {useState} from 'react';
import {invoke} from "@tauri-apps/api";

const App = () => {
    const [message, setMessage] = useState('');

    async function sayHi() {
        const msg = await invoke('say_hi') as string;
        setMessage(msg);
    }


    const [name, setName] = useState('');
    const [msgWithName, setMsgWithName] = useState('');

    async function sayHiWithName() {
        const msg = await invoke('say_hi_to', {name}) as string;
        setMsgWithName(msg);
    }

    return (
        <>
            <div>
                <h1>{message}</h1>
                <button onClick={sayHi}>Say Hi</button>
            </div>
            <div>
                <input onChange={e => setName(e.target.value)}/>
                <button onClick={sayHiWithName}>Say Hi</button>
                <p>{msgWithName}</p>
            </div>
        </>
    );
};

export default App;
