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
  IonSlide,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle
} from '@ionic/react';

const Home = () => (
  <>
    <IonHeader>
      <IonToolbar>
        <IonMenuButton slot="start" />
        <IonTitle>Kezdőlap</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
    <h1>KKV Segítő</h1>
    <IonSlides scrollbar="true">
    <IonSlide>
    <IonCard class="HomeCard">
      <IonCardHeader>
      </IonCardHeader>
        <img src="https://s.tmimgcdn.com/scr/800x500/78100/panda-logo-sablon-78131_78131-2-original.jpg" />
        <IonCardHeader>
          <IonCardTitle>Kezdőlap</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          Lorem Ipsum
        </IonCardContent>
      </IonCard>
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
