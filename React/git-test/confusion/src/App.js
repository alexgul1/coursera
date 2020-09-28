import React, {Component} from 'react';
import './App.css';
import Menu from "./components/MenuComponent";
import { Navbar, NavbarBrand } from "reactstrap";
import {BrowserRouter} from "react-router-dom";

import {DISHES} from "./shared/dishes";
import Main from "./components/MainComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    }
  }
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>

    );
  }
}

export default App;
