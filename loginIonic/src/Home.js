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
  IonCardTitle,
  IonCardSubtitle,
  IonText,
  IonRow
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

    <IonSlides scrollbar="true" className="homeslider">
    <IonSlide>
      <IonCard class="HomeCard">
      <IonCardHeader>
      <IonCardTitle>Ha minőségi munkát szeretne, itt keresse!</IonCardTitle>

        <img src="https://previews.123rf.com/images/7106108800/71061088001101/7106108800110100006/8586435-worker-with-protective-gear-with-thumbs-up.jpg" />

          <IonCardSubtitle>Plechinger Bau Kft</IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
    </IonSlide>
    <IonSlide>
      <IonCard class="HomeCard">
        <IonCardHeader>
        <img src="https://www.dutchnews.nl/wpcms/wp-content/uploads/2020/06/Handshake-Depositphotos-560x373.jpg" />

          <IonCardTitle>Forduljon felénk bizalommal!</IonCardTitle>
          </IonCardHeader>
      </IonCard>
    </IonSlide>
    <IonSlide>
      <IonCard class="HomeCard">
        <IonCardHeader>
        <img className="munkas" src="https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/hearing-protection-thumbnail.jpg" />
        
          <IonCardTitle>Képzett szakemberek</IonCardTitle>
        </IonCardHeader>
      </IonCard>
    </IonSlide>
  </IonSlides>
    </IonContent>
  </>
);

export default Home;
