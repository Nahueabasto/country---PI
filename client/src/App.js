import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './component/Landing.Page';
import Home from './component/Home';
import Detail from './component/Detail';
import Form from './component/Form';

function App() {
  return (
  <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path ="/home" component={Home} />
      <Route exact path="/countries/:id" component={Detail} />
      <Route exact path="/home/form" component={Form} />
    </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
