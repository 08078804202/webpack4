// import { App } from "./App";

import React from 'react';
import ReactDOM from 'react-dom';


export const App = () => {
  return (
    <div>
      <p>React App!</p>
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))