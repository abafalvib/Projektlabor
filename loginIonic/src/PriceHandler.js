import React, { useEffect, useState } from 'react';
import {Inject, ScheduleComponent,
        Day, Week, WorkWeek, Month, Agenda,
        EventSettingsModel, ActionEventArgs} from '@syncfusion/ej2-react-schedule';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonList,
  IonItem,
  IonBackButton,
  IonButtons,
  IonApp,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle
} from '@ionic/react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
import fire from './fire';

import emailjs from 'emailjs-com';

const PriceHandler = ({history}) => {
  const proba=Cookies.get('log');
  const [title, setTitle] = useState("");
  const [sub, setSub] = useState("");
  const [desc, setDesc] = useState("");

  // Example POST method implementation:
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  function sendEmail(){

  }



  function geolocation(FROM, TO){

    var tomtomAPI = "MBNtaBuKtyOFiiYTopy9xIEHGjDcPjA2";
    var fromlat,fromlng;
    var tolat,tolng;
    var link = "https://www.mapquestapi.com/directions/v2/optimizedroute?key=i4R1AKVNa4CLmxY7a07gUZxvkM50FztT&locale=hu_HU&unit=k&from="+FROM+"&to="+TO+"&outFormat=json&ambiguities=ignore&routeType=shortest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false"


    fetch(link)
    .then(response => response.json())
    .then((data) => {
      try{
        fromlat = data["route"]["locations"]["0"]["latLng"]["lat"];
        fromlng = data["route"]["locations"]["0"]["latLng"]["lng"];
        tolat = data["route"]["locations"]["1"]["latLng"]["lat"];
        tolng = data["route"]["locations"]["1"]["latLng"]["lng"];
          console.log(data["route"]["distance"]+" km");
        return(data["route"]["distance"]+" km")
      }catch(err){
        console.log("hibás város");
        return -1;
      }


    });




    }




  function Elfogad(){

    var db = fire.firestore("");
    var id;
    db.collection("Requests").where("elfogadva", "==" ,false)
    .limit(1)
    .get()
    .then(querySnapshot => {
    if (!querySnapshot.empty) {
        const queryDocumentSnapshot = querySnapshot.docs[0];
         id = queryDocumentSnapshot.id;
         db.collection("Requests").doc(id).update({elfogadva:true}).finally(()=>{showNext();});
    } else {
        console.log("No document corresponding to the query!");
    }
  }).finally(()=>{showNext();});
  }



  function Elutasit(){
    var db = fire.firestore("");
    var id;
    db.collection("Requests").where("elfogadva", "==" ,false)
    .limit(1)
    .get()
    .then(querySnapshot => {
    if (!querySnapshot.empty) {
        const queryDocumentSnapshot = querySnapshot.docs[0];
         id = queryDocumentSnapshot.id;
         db.collection("Requests").doc(id).delete().finally(()=>{showNext();});


    } else {
        console.log("No document corresponding to the query!");
    }
  });
  }

  function Varakoztat(){
    var db = fire.firestore("");
    var currentdate = new Date();
    var datetime = currentdate.getFullYear() +"."+ (currentdate.getMonth()+1) +"."+ (currentdate.getDate()+1)+";"+currentdate.getHours()+":"+ currentdate.getMinutes()+":"+currentdate.getSeconds();
    var n = 0;
    var datetime2 = datetime+"+"+n;
    while(db.collection("Requests").doc(datetime2).get().exists){
      n++;
      var datetime2 = datetime+"+"+n;
    }
    datetime = datetime2;
    console.log(datetime+" Is unique");


    var id;
    db.collection("Requests").where("elfogadva", "==" ,false)
    .limit(1)
    .get()
    .then(querySnapshot => {
    if (!querySnapshot.empty) {
        const queryDocumentSnapshot = querySnapshot.docs[0];
        id = queryDocumentSnapshot.id;
        db.collection("Requests").doc(id).get().then((doc)=>{db.collection("Requests").doc(datetime).set(doc.data())}).finally(()=>{db.collection("Requests").doc(id).delete().finally(()=>{showNext();})});



    } else {
        console.log("No document corresponding to the query!");
    }
  });
  }



  useEffect(() => {
    showNext();



  }, []);


  function showNext(){
    var db = fire.firestore("");


    db.collection("Requests").where("elfogadva", "==" ,false)
    .limit(1)
    .get()
    .then(querySnapshot => {
    if (!querySnapshot.empty) {
        //We know there is one doc in the querySnapshot
        const queryDocumentSnapshot = querySnapshot.docs[0];
        var temp = queryDocumentSnapshot.get("desc")+', '+queryDocumentSnapshot.get("email");
        setTitle(temp);
        temp =(queryDocumentSnapshot.get("date").toDate())+", "+"Helyszín";
        setSub(temp);
        setDesc(queryDocumentSnapshot.get("longDesc"));

    } else {
        setTitle("Nincs több Értesítés");
    }
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
              <IonTitle>Árajánlat kezelése</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          <IonCard>
          <IonCardHeader>
            <IonCardTitle >{title} </IonCardTitle>
            <IonCardSubtitle >{sub} </IonCardSubtitle>

          </IonCardHeader>

          <IonCardContent>
          {desc}
          </IonCardContent>
      <IonButton color="green"  onClick={()=>{Elfogad();}}>Elfogad</IonButton>
      <IonButton color="yellow"  onClick={()=>{Varakoztat();}}>Várakoztat</IonButton>
      <IonButton color="red"  onClick={()=>{Elutasit();}}>Elutasít</IonButton>
        </IonCard>












          </IonContent>
          </>
        )
      } else {
        return(
          <>
          <Redirect to={{pathname:"/login"}}/>
          </>
  )
  }
})()}
</>
);
}
export default PriceHandler;
