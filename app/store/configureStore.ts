import { History } from "history";
import { Store } from "redux";

let configureStore: {
  history: History,
  createStore: (initialState?: object) => Store;
}

if (process.env.NODE_ENV === 'production') {
  configureStore = require('./configureStore.production');
} else {
  configureStore = require('./configureStore.development');
}

export = configureStore;
