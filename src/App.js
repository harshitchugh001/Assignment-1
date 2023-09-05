// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './components/home'

function App() {
  return (
    <>
     <Router>
        <div className="App">

          <Routes>
            <Route key="Home" path='/' exact element={<Home></Home>} />
            <Route></Route>
          </Routes>
        </div>
      </Router>

    </>
  );
}

export default App;
