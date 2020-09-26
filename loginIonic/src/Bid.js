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

const Bid = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          {/* TODO why doesn’t this show up? */}
          <IonBackButton goBack={() => {}} />
          <IonMenuButton />
        </IonButtons>
        <IonTitle>Bid</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>

    </IonContent>
  </>
);

export default Bid;
