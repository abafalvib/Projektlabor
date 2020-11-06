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



const PriceHandler = ({history}) => {
  const proba=Cookies.get('log');
  const [title, setTitle] = useState("");
  const [sub, setSub] = useState("");
  const [desc, setDesc] = useState("");


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
    var datetime = currentdate.getFullYear() +"."+ currentdate.getMonth() +"."+ (currentdate.getDate()+1)+";"+currentdate.getHours()+":"+ currentdate.getMinutes()+":"+currentdate.getSeconds();
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
