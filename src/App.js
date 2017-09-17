import React, { Component } from 'react'
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { red500 } from 'material-ui/styles/colors'
import Home from './components/home/home'

import './App.css'

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/bfm-db'
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    const token = process.env.REACT_APP_TOKEN

    req.options.headers.authorization = token ? `Bearer ${token}` : null
    next()
  }
}])

const client = new ApolloClient({
  networkInterface: networkInterface
})

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
      <ApolloProvider client={ client }>
        <MuiThemeProvider muiTheme={ getMuiTheme(muiTheme) }>
          <div className='App'>
            <Home />
          </div>
        </MuiThemeProvider>
      </ApolloProvider>
    )
  }
}

export default App
