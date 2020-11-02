import React, {useState, useEffect} from 'react';
import {
  IonTextarea,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonList,
  IonItem,
  IonBackButton,
  IonButtons
} from '@ionic/react';
import Cookies from 'js-cookie'
import fire from './fire';


const Connect = () => {
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
              <IonBackButton defaultHref="/"></IonBackButton>
              {/*<IonMenuButton />*/}
            </IonButtons>
              <IonTitle>Kapcsolat</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonTextarea auto-grow="true" placeholder={contactText} value={contactText} onIonChange={(e) => setContactText(e.target.value)}></IonTextarea>
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
              <IonBackButton defaultHref="/"></IonBackButton>
              {/*<IonMenuButton />*/}
            </IonButtons>
              <IonTitle>Kapcsolat</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <p>{contactText}</p>
          </IonContent>
          </>
  )
  }
})()}
</>
);
}
export default Connect;
