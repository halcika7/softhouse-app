import React from 'react';
import ReactDOM from 'react-dom';

// react default files
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// providers
import { Provider } from 'react-redux';
import ThemeProvider from './styled/Provider';
import { BrowserRouter } from 'react-router-dom';

// components
import { GlobalStyle } from './styled/global';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

// redux-store
import { store } from './redux';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <GlobalStyle />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if(process.env.NODE_ENV === 'production') {
  serviceWorkerRegistration.register();
} else {
  serviceWorkerRegistration.unregister();
}
