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
        <img src="https://media.istockphoto.com/photos/confident-architect-at-construction-site-picture-id1189913209?k=6&m=1189913209&s=612x612&w=0&h=oupcjI4XvOMKuvh6yOAslUQzMn5Lpoka3iOgCJgMoxQ=" />
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
