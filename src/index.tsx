import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import * as serviceWorker from 'serviceWorker'

// Store
import store from 'app/store'

import { theme } from './theme'

// Chakra
import { ThemeProvider, CSSReset } from '@chakra-ui/core/dist'

// Components
import { Toasts } from './features/toasts/Toasts'

const render = () => {
  const App = require('./app').default

  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Toasts />
        <App />
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  )
}

render()

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app', render)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
