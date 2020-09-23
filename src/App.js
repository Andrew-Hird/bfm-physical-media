import React, { Component } from 'react'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { red500 } from 'material-ui/styles/colors'
import Home from './components/home/home'

import './App.css'

darkBaseTheme.palette.accent3Color = red500

const muiTheme = getMuiTheme({
  ...darkBaseTheme,
  slider: {
    selectionColor: red500,
    handleFillColor: red500
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={ getMuiTheme(muiTheme) }>
        <div className='App'>
          <Home />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
