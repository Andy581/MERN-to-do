import './App.css';
import AddToDo from './AddToDo';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './Navbar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoList from './Todolist';
import Edit from './Edit';


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" exact component={TodoList}/>
        <Route path="/edit/:id" component={Edit}/>
        <Route path="/create" component={AddToDo}/>
      </div>
    </Router>
  );
}

export default App;
