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
        <img src="https://previews.123rf.com/images/7106108800/71061088001101/7106108800110100006/8586435-worker-with-protective-gear-with-thumbs-up.jpg" />
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
        <img className="munkas" src="https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/hearing-protection-thumbnail.jpg" />
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
