import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './App.css';

const Count: React.FC =() =>{
    
    const [count, setCount ] = useState<number>(0)
    const handleIncrement = () => {
        setCount(count +1)
    }
    return (
        <div className="App">
            {count}
            <button onclick={handleIncrement}>+1</button>
        </div>
    );
}

export default Count;
ReactDOM.render(
    <Count />,document.getElementById('root')
);