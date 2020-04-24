import React from 'react';
import Child from './components/Child'
import './App.css';

type Item = {
  id: number
  title: string
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Child message="child Component!">
        <h1>Children!</h1>
      </Child>
    </div>
  )
}
export default App;
