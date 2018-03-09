import React from 'react';
import { render } from 'react-dom';
import App from './App';

import './assets/base.css';

const renderApp = Component => {
  render(
    <Component />,
    document.getElementById('root'),
  )
}

renderApp(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    import('./App').then(({ default: NextApp }) => {
      renderApp(NextApp);
    });
  });
}
