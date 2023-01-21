import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null) // для связи с UserStore (контекст реакта)

root.render(
  <Context.Provider value={{
      user : new UserStore(), // для связи с UserStore (контекст реакта)
      device : new DeviceStore()
  }}>
    <App />
  </Context.Provider>
);

