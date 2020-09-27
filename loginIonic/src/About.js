
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
  IonButtons,

} from '@ionic/react';

const About = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>Rólunk</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
    <ion-card>
        <img src="https://as1.ftcdn.net/jpg/02/11/26/98/500_F_211269880_j3hBBnIyUSwg168l6tjAolifK8Z35Bif.jpg" />
        <ion-card-header>
          <ion-card-title>KKV helper</ion-card-title>
          <ion-card-subtitle>Rólunk</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          Lorem Ipsum 1985 Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
          Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum
          Lorem IpsumLorem Ipsum
        </ion-card-content>
      </ion-card>
    
    </IonContent>
  </>
);

export default About;
