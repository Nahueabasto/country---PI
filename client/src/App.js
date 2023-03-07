import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './component/Landing.Page';
import Home from './component/Home';
import Detail from './component/Detail';

function App() {
  return (
  <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path ="/home" component={Home} />
      <Route exact path="/countries/:id" component={Detail} />
    </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
