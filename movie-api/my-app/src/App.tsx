import * as React from 'react';
import './App.css';
import './include/bootstrap';
import { SignUpComponent } from './components/sign-up/sign-up';
import { AppNav } from './components/nav/nav.component';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CreateReimbursementComponent } from './components/create-reimbursement/create-reimbursement.component';
import { EditReimbursementComponent } from './components/edit-reimbursement/edit-reimbursement.component';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div>
          <AppNav />
          <div id="main-content-container">
            <Switch>
              <Route path="/sign-up" component={SignUpComponent} />
              <Route path="/home" component={HomeComponent} />
              <Route path="/sign-in" component={SignInComponent} />
              <Route path="/create-reimbursement" component={CreateReimbursementComponent} />
              <Route path="/edit-reimbursement" component={EditReimbursementComponent} />
              <Route component={SignInComponent} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
