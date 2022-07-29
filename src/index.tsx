import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './components/app';
import './style.less';
// import { Provider as StoreProvider } from 'react-redux';
// import store from "./store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <StoreProvider store={store}>
  //   <App />
  // </StoreProvider>
  <App />
  // <div>hello</div>
);
