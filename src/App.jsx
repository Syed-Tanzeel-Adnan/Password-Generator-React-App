import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
export default function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);



  const passwordGenerator = useCallback(() => {
      console.log("passwordGenerator rendered");
      let pass = "";
      let str = "abcdefghijklmnopqrstuvwxyzABCABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if(numberAllowed) str += "0123456789";
      if(charAllowed) str += "!@#$%^&*()_+";
      for(let i = 0; i < length; i++) {
          pass += str.charAt(Math.floor(Math.random() * str.length));
      }
      setPassword(pass);
  }, [length, charAllowed, numberAllowed]);

  
  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    // passwordRef?.setSelectionRange(0, 30);
    window.navigator.clipboard.writeText(password);
  }

  useEffect(() => {
    console.log("App rendered/calling passwordGenerator");
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  


  return (
    <>
      {
      
        <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
        <div className='flex flex-col w-full max-w-xl shadow-md rounded-lg px-4 my-8 bg-gray-800 text-orange-500 h-full py-6 '>
          <h1 className='text-white text-3xl font-extrabold text-center my-3 pb-14'>Password Generator</h1>
          
          <div className="flex shadow rounded-lg overflow-hidden mb-4 pb-3">
            <input
              type="text"
              value={password}
              className="w-full px-3 py-2 border text-lg rounded-md outline-none bg-gray-700 text-white font-bold"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="outline-none bg-blue-700 font-bold text-white px-3 py-0.5 shrink-0"
              onClick={copyPasswordToClipboard}
            >
              Copy
            </button>
          </div>
          
          <div className='flex justify-between items-center py-4 px-2 flex-1 pb-8'>
            <div className='flex items-center gap-x-2'>
              <input
                type="range"
                min="8"
                max="100"
                value={length}
                onChange={(e) => { setLength(e.target.value) }}
                className="cursor-pointer font-bold"
              />
              <label className='font-bold text-xl'>Length: {length}</label>
            </div>
            
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => { setNumberAllowed((prev) => !prev) }}
              />
              <label className='font-bold text-xl' htmlFor="number">Numbers</label>
            </div>
            
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => { setCharAllowed((prev) => !prev) }}
              />
              <label className=" font-bold text-xl" htmlFor="characterInput">Characters</label>
            </div>
           </div>
         </div>
       </div>
      
        
     }
    </>
  )
}


