import React from 'react';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonButton,
  IonSplitPane,
  IonRouterOutlet,
  IonPage,
  IonItem,
  IonMenu,
  IonMenuToggle

} from '@ionic/react';
import {BrowserRouter,Route,Router} from 'react-router-dom';
const Welcome = ({handleLogout}) => {
return(
  <>

  <div>
  <IonButton onClick={handleLogout}>Logout</IonButton>
  </div>



  </>

);
}

export default Welcome;
