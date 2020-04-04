import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import * as serviceWorker from 'serviceWorker'

// Store
import store, { rrfProps } from 'app/store'

// Theme
import { theme, defaultConfig } from './theme'

// Chakra
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core/dist'
import { AuthIsLoaded } from 'components'

const render = () => {
  const App = require('./app').default

  ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ThemeProvider theme={theme}>
          <ColorModeProvider>
            <CSSReset config={defaultConfig} />
            <BrowserRouter>
              <AuthIsLoaded>
                <App />
              </AuthIsLoaded>
            </BrowserRouter>
          </ColorModeProvider>
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
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
