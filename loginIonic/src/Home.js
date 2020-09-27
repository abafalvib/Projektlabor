import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonMenuButton,
  IonButton,
  IonSlides,
  IonSlide
} from '@ionic/react';

const Home = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonMenuButton slot="start" />
        <IonTitle>Home</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
    <h1>KKV Helper</h1>
    <IonSlides scrollbar="true">
    <IonSlide>
    <ion-card class="HomeCard">
      <ion-card-header>
      </ion-card-header>
        <img src="https://s.tmimgcdn.com/scr/800x500/78100/panda-logo-sablon-78131_78131-2-original.jpg" />
        <ion-card-header>
          <ion-card-title>Home</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Lorem Ipsum
        </ion-card-content>
      </ion-card>
    </IonSlide>
    <IonSlide>
      <h1>Slide 2</h1>
    </IonSlide>
    <IonSlide>
      <h1>Slide 3</h1>
    </IonSlide>
  </IonSlides>
    </IonContent>
  </>
);

export default Home;
