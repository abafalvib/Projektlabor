
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

const About = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          {/* TODO why doesn’t this show up? */}
          <IonBackButton goBack={() => {}} />
          <IonMenuButton />
        </IonButtons>
        <IonTitle>About</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>

    </IonContent>
  </>
);

export default About;
