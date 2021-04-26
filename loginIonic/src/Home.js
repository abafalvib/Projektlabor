import React, {useEffect,useState} from 'react';
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
  IonTextarea
} from '@ionic/react';
import fire from './fire';

import Cookies from 'js-cookie';
const proba=Cookies.get('log');




const Home = () => {
  const [text,setText]=useState("");

  useEffect(() => {var db = fire.firestore("");
  var docRef = db.collection("Texts").doc("NhaKoopVtQ8K21zBXvmk");
  docRef.get().then(function(doc) {
      if (doc.exists) {
          setText(doc.get("About"));
          console.log(text);
          } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });}, []);

return(

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
  <IonCard>
      <IonCardHeader>
      <IonCardTitle>Rólunk</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
    <IonItem>
      <IonTextarea readonly auto-grow="true" placeholder={text} value={text}></IonTextarea>
    </IonItem>

    </IonCardContent>
    </IonCard>
    <br/>
    <br/>
    <br/>

    </IonContent>

  </>
);
}

export default Home;
