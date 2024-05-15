import logo from './logo.svg';
import './App.css';
import Myform from './component/myform';
import Sub from './component/hello'
import { Routes ,Route  } from 'react-router-dom';
function App() {
  return(
    <>
    <Routes>
    <Route path="/myform" element={<Myform />} />
    <Route path="/hello" element={<Sub/>}/>
  </Routes>
  </>
  );
}

export default App;
