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
    <h1>Plechinger Bau Kft</h1>
    <IonSlides scrollbar="true">
    <IonSlide>
      <IonCard class="HomeCard">
        <img height="50%" width="50%" src="https://miro.medium.com/max/744/1*vh4vsuoZCWZhKJTnJy_jVg.jpeg" />
        <IonCardHeader>
          <IonCardTitle>Ha minőségi munkát szeretne, itt keresse!</IonCardTitle>
        </IonCardHeader>
      </IonCard>
    </IonSlide>
    <IonSlide>
      <IonCard class="HomeCard">
        <img src="https://www.dutchnews.nl/wpcms/wp-content/uploads/2020/06/Handshake-Depositphotos-560x373.jpg" />
        <IonCardHeader>
          <IonCardTitle>Forduljon felénk bizalommal!</IonCardTitle>
          </IonCardHeader>
      </IonCard>
    </IonSlide>
    <IonSlide>
      <IonCard class="HomeCard">
        <img src="https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/hearing-protection-thumbnail.jpg" />
        <IonCardHeader>
          <IonCardTitle>Képzett szakemberek</IonCardTitle>
        </IonCardHeader>
      </IonCard>
    </IonSlide>
  </IonSlides>
    </IonContent>
  </>
);

export default Home;
