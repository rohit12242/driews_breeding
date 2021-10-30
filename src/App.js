import ThemeConfig from './theme'
import Home from './pages/home'
import DriewsList from './component/driewsList';
import Breeding from './component/breeding';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <ThemeConfig>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/driews'>
            <DriewsList />
          </Route>
          <Route exact path='/breeding'>
            <Breeding />
          </Route>
        </Switch>
      </Router>
    </ThemeConfig>
  );
}

export default App;
