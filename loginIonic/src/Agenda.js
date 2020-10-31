import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonList,
  IonItem,
  IonBackButton,
  IonButtons
} from '@ionic/react';
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom';
import fire from './fire';
const Agenda = () => {
  const proba=Cookies.get('log');
  return(
    <>

    {(() => {
      if (proba=='loginTrue') {
        return (
          <>
          <IonHeader>
            <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/"></IonBackButton>
              {/*<IonMenuButton />*/}
            </IonButtons>
              <IonTitle>Napirend</IonTitle>
            </IonToolbar>
          </IonHeader>
          </>
        )
      } else {
        return(
          <>
          <Redirect to={{pathname:"/login"}}/>
          </>
  )
  }
})()}
</>
);
}
export default Agenda;
