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


          <IonCardSubtitle>Plechinger Bau Kft</IonCardSubtitle>
          <img className="elso" height="150 px" width="150 px" src="https://media.istockphoto.com/photos/confident-architect-at-construction-site-picture-id1189913209?k=6&m=1189913209&s=612x612&w=0&h=oupcjI4XvOMKuvh6yOAslUQzMn5Lpoka3iOgCJgMoxQ=" />

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
