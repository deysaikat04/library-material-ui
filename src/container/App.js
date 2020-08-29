import React, { useState, Fragment } from 'react';
import "../App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './Navbar';
// import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SignUp from '../components/auth/SignUp';
import SignIn from '../components/auth/SignIn';
import Search from '../components/Search';
import BookCardGrid from './BookCardGrid';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    backgroundColor: theme.palette.background.paper,
  },
}));

function App() {
  // const classes = useStyles();
  const [isLoggedin, setIsLoggedin] = useState(false);

  return (
    <Router>
      <Fragment>
        <Navbar isLoggedin={isLoggedin} />
        <Switch>
          <Route exact path='/' render={(props) => <Search {...props} />} />
          <Route exact path='/signup' render={() => <SignUp />} />
          <Route exact path='/signin' render={() => <SignIn />} />
          <Route exact path='/search/:name' render={(props) => <BookCardGrid {...props} />} />

          <Route exact path='/*' render={() => <Redirect to='/' />} />
        </Switch>

      </Fragment>
    </Router>
  );
}

export default App;
