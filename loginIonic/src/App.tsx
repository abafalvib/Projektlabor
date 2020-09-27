import React, {useRef, useState, useEffect, Component} from 'react';
import "./index.css";
import fire from './fire';
import Hero from './Hero';
import Menu from'./Menu';
import Home from './Home';
import About from './About';
import Bid from './Bid';
import Connect from './Connect';
import Login from './Login';
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
            <Route path="/connect" component={Connect} />
            <Route path="/bid" component={Bid} />
            <Route path="/login" component={Login} />
          </IonRouterOutlet>
        </IonPage>
      </IonSplitPane>
    </IonApp>
  </BrowserRouter>
);
}

export default App;
