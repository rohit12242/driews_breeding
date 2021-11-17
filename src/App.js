import ThemeConfig from './theme'
import Home from './pages/home'
import DriewsList from './component/driewsList';
import Breeding from './component/breeding';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { Slide } from '@mui/material';
import NotFound from './component/notFound';

function App() {
  return (
    <ThemeConfig>
      <SnackbarProvider anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }} TransitionComponent={Slide}
      >
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/driews/:address'>
              <DriewsList />
            </Route>
            <Route exact path='/breeding'>
              <Breeding />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </SnackbarProvider>
    </ThemeConfig>
  );
}

export default App;
