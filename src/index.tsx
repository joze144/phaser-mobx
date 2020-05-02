import React from 'react';
import { render } from 'react-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import theme from './components/Theme';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react';
import { createStores } from './components';
import { GameView } from './components/game/GameView';
import Footer from './components/Footer/Footer';
import CurrentScoreView from './components/game/CurrentScoreView';

const stores = createStores();

render(
  <Provider store={stores}>
    <ThemeProvider theme={theme}>
      <CurrentScoreView gameStore={stores.gameStore} />
      <div className="container-flex">
        <GameView gameStore={stores.gameStore} />
      </div>
      <Footer />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
