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

const Login = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
          {/*<IonMenuButton />*/}
        </IonButtons>
        <IonTitle>Bejelentkezés</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>

    </IonContent>
  </>
);

export default Login;
