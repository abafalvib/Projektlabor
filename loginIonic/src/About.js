
import React, {useState, useEffect} from 'react';

import {callOutline, businessOutline, mailOutline, personOutline} from 'ionicons/icons';

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
  IonCardSubtitle,
  IonIcon

} from '@ionic/react';
import Cookies from 'js-cookie'
import emailjs from 'emailjs-com';
import fire from './fire';

const About = () => {
const proba=Cookies.get('log');
const [text,setText]=useState("");
const [contactText,setContactText]=useState("");
const [telText,setTelText]=useState("");
const [adressText,setAdressText]=useState("");
const [emailText,setEmailText]=useState("");
const [nameText,setNameText]=useState("");
const [orText,setOrText]=useState("");
var db = fire.firestore();
var docRef = db.collection("Texts").doc("NhaKoopVtQ8K21zBXvmk");
useEffect(() => {var db = fire.firestore("");
var docRef = db.collection("Texts").doc("NhaKoopVtQ8K21zBXvmk");
docRef.get().then(function(doc) {
    if (doc.exists) {
        setContactText(doc.get("Contact"));
        setText(doc.get("About"));
        setTelText(doc.get("Telefon"));
        setAdressText(doc.get("Address"));
        setEmailText(doc.get("Email"));
        setNameText(doc.get("Name"));
        setOrText(doc.get("Or"));
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
  Contact: contactText,
  Telefon: telText,
  Address: adressText,
  Email: emailText,
  Name: nameText,
  Or: orText
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
function sendEmail(e) {
  e.preventDefault();

  emailjs.sendForm('gmail', 'Contact_Template', e.target, 'user_i5wHzJ9RuYMkYklggEtke')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
    e.target.reset()
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
                <IonBackButton defaultHref='/agendamenu' />
              </IonButtons>
              <IonTitle>Rólunk & Kapcsolat</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          <IonCard>
              <img src="https://as1.ftcdn.net/jpg/02/11/26/98/500_F_211269880_j3hBBnIyUSwg168l6tjAolifK8Z35Bif.jpg" />
              <IonCardHeader>
                <IonCardTitle>Rólunk</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
              <IonItem>
                <IonTextarea className="rolunk" auto-grow="true" placeholder={text} value={text} onIonChange={(e) => setText(e.target.value)}></IonTextarea>
                </IonItem>
              </IonCardContent>
            </IonCard>
            <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Kapcsolat</IonCardTitle>
                  <h5>Miben segíthetünk?</h5>
                </IonCardHeader>
                <IonCardContent>

                <IonItem>
                  <IonTextarea auto-grow="true" placeholder={contactText} value={contactText} onIonChange={(e) => setContactText(e.target.value)}></IonTextarea>
                  </IonItem>
                </IonCardContent>
                <br/>
                <br/>
                <br/>
                <IonCardContent className="wrapper2">
                <div className="form-wrapper2">
                <form onSubmit={sendEmail}>
                <div>
                <input required type="email" placeholder="Email cím" name="email"></input>
                </div>
                  <div>
              <textarea required placeholder="Írd le a problémádat"name="message"></textarea>
              </div>
              <input type="submit" value="Üzenet küldése"></input>

                </form>
                </div>
                  </IonCardContent>
                  <br/>
                  <br/>
                  <br/>


                <IonCardContent>
                <IonItem>
                  <IonTextarea auto-grow="true" placeholder={orText} value={orText} onIonChange={(e) => setOrText(e.target.value)}></IonTextarea>
                  </IonItem>


                <div className="area">
                <IonItem>
                <IonIcon icon={callOutline} className="rolunk" slot="start" />
                <IonTextarea  placeholder={telText}value={telText}onIonChange={(e) => setTelText(e.target.value)}></IonTextarea>
                </IonItem>
                </div>
                <div className="area">
                <IonItem>
                <IonIcon icon={businessOutline} className="rolunk" slot="start" />
                <IonTextarea  placeholder={adressText}value={adressText}onIonChange={(e) => setAdressText(e.target.value)}></IonTextarea>
                </IonItem>
                </div>
                <div className="area">
                <IonItem >
                <IonIcon icon={mailOutline} className="rolunk" slot="start" />
                <IonTextarea    placeholder={emailText}value={emailText}onIonChange={(e) => setEmailText(e.target.value)}></IonTextarea>
                </IonItem>
                </div>
                <div className="area">
                <IonItem >
                <IonIcon icon={personOutline} className="rolunk" slot="start" />
                <IonTextarea    placeholder={nameText}value={nameText}onIonChange={(e) => setNameText(e.target.value)}></IonTextarea>
                </IonItem>
                </div>
                </IonCardContent>

              </IonCard>
              <div align="center">
              <IonButton onClick={(e) => Submit()}>
                Változtatások mentése
              </IonButton>
              </div>
              <br/>
              <br/>
              <br/>
              <br/>

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
              <IonTitle>Kapcsolat</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="aboutwrapper">

            <IonCard>
              <img src="https://as1.ftcdn.net/jpg/02/11/26/98/500_F_211269880_j3hBBnIyUSwg168l6tjAolifK8Z35Bif.jpg" />

                <IonCardHeader>
                  <IonCardTitle>Kapcsolat</IonCardTitle>
                  <h5>Miben segíthetünk?</h5>
                </IonCardHeader>
                <IonCardContent>
                <IonItem>
                  <IonTextarea readonly auto-grow="true" placeholder={contactText} value={contactText} onIonChange={(e) => setContactText(e.target.value)}></IonTextarea>
                  </IonItem>
                </IonCardContent>
                <br/>
                <br/>
                <br/>
                <IonCardContent className="wrapper2">
                <div className="form-wrapper2">
                <form onSubmit={sendEmail}>
                <div>
                <input required type="email" placeholder="Email cím" name="email"></input>
                </div>
                  <div>
              <textarea required placeholder="Írd le a problémádat"name="message"></textarea>
              </div>
              <input type="submit" value="Üzenet küldése"></input>

                </form>
                </div>
                  </IonCardContent>
                  <br/>
                  <br/>
                  <br/>
                <IonCardContent>

                <IonItem>
                  <IonTextarea readonly auto-grow="true" placeholder={orText} value={orText} onIonChange={(e) => setOrText(e.target.value)}></IonTextarea>
                  </IonItem>


                <div className="area">
                <IonItem>
                <IonIcon icon={callOutline} className="rolunk" slot="start" />
                <IonTextarea readonly  placeholder={telText}value={telText}onIonChange={(e) => setTelText(e.target.value)}></IonTextarea>
                </IonItem>
                </div>
                <div className="area">
                <IonItem>
                <IonIcon icon={businessOutline} className="rolunk" slot="start" />
                <IonTextarea readonly placeholder={adressText}value={adressText}onIonChange={(e) => setAdressText(e.target.value)}></IonTextarea>
                </IonItem>
                </div>
                <div className="area">
                <IonItem >
                <IonIcon icon={mailOutline} className="rolunk" slot="start" />
                <IonTextarea  readonly  placeholder={emailText}value={emailText}onIonChange={(e) => setEmailText(e.target.value)}></IonTextarea>
                </IonItem>
                </div>
                <div className="area">
                <IonItem >
                <IonIcon icon={personOutline} className="rolunk" slot="start" />
                <IonTextarea readonly   placeholder={nameText}value={nameText}onIonChange={(e) => setNameText(e.target.value)}></IonTextarea>
                </IonItem>
                </div>
                </IonCardContent>

              </IonCard>
              <br/>
              <br/>
              <br/>
              <br/>

          </IonContent>
        </>
)
}
})()}
</>
);
}

export default About;
