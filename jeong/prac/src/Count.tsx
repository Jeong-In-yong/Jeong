import React, {useState} from 'react';
import './App.css';

const Count: React.FC =() =>{
    
//   const [count, setCount ] = useState<number>(0)
//   const handleIncrement = () => {
//       setCount(count +1)
//   }
//   const handleDecrement = () => {
//       setCount(count -1)
//   }
//   return (
//       <div className="App">
//           <p>{count}</p>
//           <button onClick={handleIncrement}>+1</button>
//           <button onClick={handleDecrement}>-1</button>
//       </div>
//   );
// }
  const [message, setMessage ] = useState<string>('')
  const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
      setMessage(e.target.value)
  }

  return (
      <div className="App">
          <p>{message}</p>
          <input type="text" value={message} onChange={handleMessage}/>
      </div>
  );
}
export default Count;
