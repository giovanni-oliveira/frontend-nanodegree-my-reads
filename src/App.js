import React, { Component }  from 'react';
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SearchBooks from './SearchBooks.js';
import MyShelfs from './MyShelfs.js';


class BooksApp extends Component {
  render() {
    return (
      <div className="app">        
        <BrowserRouter>
          <Switch>
            <Route 
              path="/" 
              exact={true} 
              component={MyShelfs} />}
            />

            <Route 
              path="/search" 
              exact={true} 
              component={SearchBooks} 
            />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
