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

const Connect = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
          {/*<IonMenuButton />*/}
        </IonButtons>
        <IonTitle>Kapcsolat</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>

    </IonContent>
  </>
);

export default Connect;
