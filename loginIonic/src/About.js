
import React, {useState, useEffect} from 'react';
import {
  IonHeader,
  IonTextarea,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonMenuButton,
  IonList,
  IonItem,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle

} from '@ionic/react';
import Cookies from 'js-cookie'

import fire from './fire';

const About = () => {
const proba=Cookies.get('log');
const [text,setText]=useState("");
const [contactText,setContactText]=useState("");

var db = fire.firestore();
var docRef = db.collection("Texts").doc("NhaKoopVtQ8K21zBXvmk");
useEffect(() => {var db = fire.firestore("");
var docRef = db.collection("Texts").doc("NhaKoopVtQ8K21zBXvmk");
docRef.get().then(function(doc) {
    if (doc.exists) {
        setContactText(doc.get("Contact"));
        setText(doc.get("About"));
        console.log(text);
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});}, []);

function Submit(){var db = fire.firestore();
  docRef.set({
  About: text,
  Contact: contactText
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  }).finally(function() {
    window.location.reload(false);
  });

}

return(

  <>

  {(() => {
    if (proba=='loginTrue') {
      return (
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
          <IonCard>
              <img src="https://as1.ftcdn.net/jpg/02/11/26/98/500_F_211269880_j3hBBnIyUSwg168l6tjAolifK8Z35Bif.jpg" />
              <IonCardHeader>
                <IonCardTitle>KKV helper</IonCardTitle>
                <IonCardSubtitle>Rólunk</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonTextarea auto-grow="true" placeholder={text} value={text} onIonChange={(e) => setText(e.target.value)}></IonTextarea>
              </IonCardContent>
            </IonCard>
            <IonButton onClick={(e) => Submit()}>
              Változtatások mentése
            </IonButton>
          </IonContent>
        </>
      )
    } else {
      return(
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
          <IonCard>
              <img src="https://as1.ftcdn.net/jpg/02/11/26/98/500_F_211269880_j3hBBnIyUSwg168l6tjAolifK8Z35Bif.jpg" />
              <IonCardHeader>
                <IonCardTitle>KKV helper</IonCardTitle>
                <IonCardSubtitle>Rólunk</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{text}</p>
              </IonCardContent>
            </IonCard>

          </IonContent>
        </>
)
}
})()}
</>
);
}

export default About;
