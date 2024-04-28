import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './screens/Home';
import Login from './screens/Login';
//Added these line for carousel as it is a bootstrap component and its buttons need this
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup.js';
import { CartProvider } from './components/ContextReducer.js';
import MyOrders from './screens/MyOrders.js';
function App() {
  return (
    <CartProvider>
      <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/myorders' element={<MyOrders/>}/>
      </Routes>
      
    </Router>
    </CartProvider>
    
  );
}

export default App;
