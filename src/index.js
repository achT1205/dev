import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import configureStore from './store';
import configureI18n from './i18n';
import { languageChange } from 'i18next-redux-languagedetector';
import { loadCarMarks } from './actions/vehiculActions';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const i18nextConfig = {
    language: null,
    whitelist: ['en', 'fr'],
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    debug: true,
  }
  
  const { store } = configureStore({
    i18next: i18nextConfig,
  });
  store.dispatch(loadCarMarks());
  const i18n = configureI18n({
    i18nextConfig: i18nextConfig,
    redux: {
      lookupRedux: () => store.getState().i18next,
      cacheUserLanguageRedux: (language) => store.dispatch(languageChange(language))
    }
  });
  
ReactDOM.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </Provider>, document.getElementById('root'));

registerServiceWorker();