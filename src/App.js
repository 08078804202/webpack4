import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import "./index.scss"
import "./index.less"
import zp01 from "./zp01.JPG"


const App = () => {
  return (
    <div >
      <p>React here! 123  666 777</p>
      <img src={zp01} width={300} height={200} />
      <div className='aaa'>
      </div>
    </div>
  )
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));