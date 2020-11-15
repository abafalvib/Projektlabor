import React, {useRef, useState, useEffect, Component} from 'react';
import "./index.css";
import Menu from'./Menu';
import Home from './Home';
import About from './About';
import Bid from './Bid';
import Login from './Login';
import PriceChange from './PriceChange';
import AgendaMenu from './AgendaMenu';
import PriceHandler from './PriceHandler';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import Calendar from 'react-calendar';
import myCalendar from './components/Calendar';
import 'react-calendar/dist/Calendar.css';
import Cookies from 'js-cookie'

import { IonApp, IonButton,IonButtons,IonMenuButton, IonInput,
          IonLabel, IonItem, IonTitle, IonHeader,IonSplitPane,
        IonToolbar, IonIcon, IonContent, IonPage, IonRouterOutlet} from '@ionic/react';
        import {BrowserRouter,Route,Router} from 'react-router-dom';
import '@ionic/core/css/ionic.bundle.css';
import {calendarOutline} from 'ionicons/icons';



const App: React.FC = () => {
return (
  <BrowserRouter>
    <IonApp>
      <IonSplitPane disabled="true" contentId="main">
        <Menu />
        <IonPage id="main">
          <IonRouterOutlet>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/bid" component={Bid} />
            <Route path="/login" component={Login} />
            <Route path="/pricechange" component={PriceChange} />
              <Route path="/pricehandler" component={PriceHandler} />
            <Route path="/agendamenu" component={AgendaMenu} />
          </IonRouterOutlet>
        </IonPage>
      </IonSplitPane>
    </IonApp>
  </BrowserRouter>
);
}

export default App;
