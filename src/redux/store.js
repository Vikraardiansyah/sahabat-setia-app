import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'

const logger = createLogger()
const enhancer = applyMiddleware(promiseMiddleware, logger)
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['_persist'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)



export default () => {
  let store = createStore(persistedReducer, enhancer)
  let persistor = persistStore(store)
  return { store, persistor }
}