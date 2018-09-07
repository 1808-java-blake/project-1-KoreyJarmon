import * as React from 'react';
import './App.css';
import './include/bootstrap';
import { FirstComponent } from './components/first/first.component';
import { AppNav } from './components/nav/nav.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ClickerComponent } from './components/clicker/clicker.component';
import { CreateReimbursementComponent } from './components/create-reimbursement/create-reimbursement.component';

import { MoviesComponent } from './components/movies/movie.component';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <AppNav />
          <div id="main-content-container">
            <Switch>
              <Route path="/first" component={FirstComponent} />
              <Route path="/home" component={HomeComponent} />
              <Route path="/sign-in" component={SignInComponent} />
              <Route path="/clicker" component={ClickerComponent} />
              <Route path="/create-reimbursement" component={CreateReimbursementComponent} />
              <Route path="/movies" component={MoviesComponent} />
              <Route component={SignInComponent} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
