import React, { useEffect, useState } from 'react';
import {Inject, ScheduleComponent,
        Day, Week, WorkWeek, Month, Agenda,
        EventSettingsModel, ActionEventArgs} from '@syncfusion/ej2-react-schedule';
import {checkmarkCircleOutline, closeCircleOutline,timeOutline} from 'ionicons/icons';
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
  IonCardSubtitle,
  IonLabel,
  IonInput,
  IonIcon,
  IonItemOption,
  IonItemOptions,
  IonItemSliding
} from '@ionic/react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
import fire from './fire';
import { isPlatform } from '@ionic/react';

import emailjs from 'emailjs-com';


const PriceHandler = ({history}) => {
  const proba=Cookies.get('log');
  const [title, setTitle] = useState("");
  const [sub, setSub] = useState("");
  const [hely, setHely] = useState("");
  const [nem, setNem] = useState("");
  const [desc, setDesc] = useState("");
  const [admin, setAdmin] = useState("admin@gmail.com");
  const [addDate, setAddDate] = useState(new Date());
  const [sentState,setSentState] = useState(0);
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

  function sendEmail(text,email){
    if(email=="" || email==undefined){
      return;
    }
    try{
      emailjs.send('gmail', 'Accept_Template', {tartalom : text,email : email}, 'user_i5wHzJ9RuYMkYklggEtke').then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
         console.log('FAILED...', error);
      });
    }catch(error){
      console.log(error);
    }

  }


  function handleSlide(event) {
      event.target.getSlidingRatio().then(res => {
        let ratio = res;
        console.log(ratio);
        if (ratio<=-1) {
          console.log("Elfogadva");
          event.target.closeOpened();
          Elfogad();
        }else if (ratio>=1) {
          console.log("Elutasitva");
          event.target.closeOpened();
          Elutasit();
        }
    });
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


  var currentdate = new Date();
  const [maxDate,setMaxDate]= useState(new Date());


  function Elfogad(){

    var db = fire.firestore("");
    var id;
    var t;


    db.collection("Requests").where("elfogadva", "==" ,false)
    .limit(1)
    .get()
    .then(querySnapshot => {
    if (!querySnapshot.empty) {
        const queryDocumentSnapshot = querySnapshot.docs[0];
         //Edit date
         //Edit date
         //Edit date
         //Edit date
         //Edit date
         //Edit date
         //Edit date
         //Edit date

         id = queryDocumentSnapshot.id;
         var desc;
         var email;
         var date;
         var long;
         var f;
         db.collection("Requests").doc(id).get().then((doc)=>{
           desc= doc.get("desc");
           date = doc.get("date").toDate();
           email = doc.get("email");
           long = `Az Ön által leadott `+desc+` munkakérelem elfogadásra került! A munkavégzés időpontja: `+ date +`További kérdés felmerülése esetén keressen az plechingerbau@gmail.com e-mail címen vagy a +36303002762 telefonszámon!`;


           db.collection("Requests").where("elfogadva", "==" ,true).orderBy("date","desc")
           .limit(1)
           .get()
           .then(querySnapshot => {
           if (!querySnapshot.empty) {
               //We know there is one doc in the querySnapshot
               const queryDocumentSnapshot = querySnapshot.docs[0];
               var temp = queryDocumentSnapshot.get("date").toDate();

               const tomorrow = new Date(temp);
               tomorrow.setDate(tomorrow.getDate() + 1);

               if(tomorrow>date){
                 console.log("wrong data");
                 f=undefined;
                 Elutasit();
               }else {
                 f=tomorrow;
                 console.log(f);
               }


               //setDesc(queryDocumentSnapshot.get("longDesc"));

           } else {
             const today = new Date();
             const tomorrow = new Date(today);
             tomorrow.setDate(tomorrow.getDate() + 1);
             if(tomorrow>date){
               f=undefined;
               Elutasit();
             }
             f = tomorrow;
           }
         }).then(()=>{



                       console.log(f);
                       if(f==undefined){
                         console.log("error")
                         return;
                       }else{
                         db.collection("Requests").doc(id).update({date:f}).finally(()=>{showNext();});

                       }



         }).finally(()=>{
           db.collection("Requests").doc(id).update({elfogadva:true}).finally(()=>{showNext();});
           sendEmail(long,email);
         });







  }).finally(()=>{showNext();});
  }   else {
        console.log("No document corresponding to the query!");
    }
  })
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
         var desc;
         var email;
         var date;
         var long;
         db.collection("Requests").doc(id).get().then((doc)=>{
           desc= doc.get("desc");
           date = doc.get("date").toDate();
           email = doc.get("email");
           long = `Az Ön által leadott `+desc+` munkakérelem elutasításra került!`;
         }).finally(()=>{
           sendEmail(long,email);
            db.collection("Requests").doc(id).delete().finally(()=>{showNext();});
         });







    } else {
        console.log("No document corresponding to the query!");
    }
  });
  }

  function Varakoztat(){
    var db = fire.firestore("");
    var currentdate = new Date();
    var datetime = (currentdate.getFullYear()+1111) +"."+ (currentdate.getMonth()+11) +"."+ (currentdate.getDate()+11)+";"+(currentdate.getHours()+11)+":"+ (currentdate.getMinutes()+11)+":"+(currentdate.getSeconds()+11)+(currentdate.getMilliseconds()+11111);
    var datetime2 = datetime+"+"+Math.floor(Math.random() * 10);
    var done = false;
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
        var desc;
        var email;
        var date;
        var long;
        db.collection("Requests").doc(id).get().then((doc)=>{
          desc= doc.get("desc");
          date = doc.get("date").toDate();
          email = doc.get("email");
          long = `Az Ön által leadott `+desc+` munkához további egyeztetés szükséges, kérem ehhez keressen fel a plechingerbau@gmail.com e-mail címen vagy a +36303002762 telefonszámon!`;
          db.collection("Requests").doc(datetime).set(doc.data())}).finally(()=>{sendEmail(long,email);db.collection("Requests").doc(id).delete().finally(()=>{showNext();})});



    } else {
        console.log("No document corresponding to the query!");
    }
  });
  }

  function GenerateName(){
    var db = fire.firestore("");
    var currentdate = new Date();
    var datetime = (currentdate.getFullYear()+1111) +"."+ (currentdate.getMonth()+11) +"."+ (currentdate.getDate()+11)+";"+(currentdate.getHours()+11)+":"+ (currentdate.getMinutes()+11)+":"+(currentdate.getSeconds()+11)+(currentdate.getMilliseconds()+11111);
    var datetime2 = datetime+"+"+Math.floor(Math.random() * 10);
    var done = false;
    datetime = datetime2;
    return datetime;
  }

  function onDateChange (date) {
    setAddDate(date);
  };

  function Hozzaad(FROM, TO){
   var db = fire.firestore("");
   var tomtomAPI = "MBNtaBuKtyOFiiYTopy9xIEHGjDcPjA2";
   var fromlat,fromlng;
   var tolat,tolng;
   var date= new Date();
   var link = "https://www.mapquestapi.com/directions/v2/optimizedroute?key=i4R1AKVNa4CLmxY7a07gUZxvkM50FztT&locale=hu_HU&unit=k&from="+FROM+"&to="+TO+"&outFormat=json&ambiguities=ignore&routeType=shortest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false"


   fetch(link)
   .then(response => response.json())
   .then((data) => {
     try{
       if(hely!=""&&data["route"]["distance"]!=undefined){
         db.collection('Requests').doc(GenerateName()).set({
           date: addDate,
           desc: nem,
           location: hely,
           distance: data["route"]["distance"]+" km",
           elfogadva: true,
           email: "",
           longDesc: nem+" (Távolság: "+data["route"]["distance"]+" km)"
         })
         .then(function(docRef) {
           console.log("Document written.");
           setSentState(1);
         })
         .catch(function(error) {
           console.error("Error adding document: ", error);
         })
       }else if(nem==""){
         setSentState(-2);
       }else{
         setSentState(-1);
       }
     }catch(err){
       console.log("hibás város");
       setSentState(-1);
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
        temp =(queryDocumentSnapshot.get("date").toDate())+", "+queryDocumentSnapshot.get("location")+" ("+queryDocumentSnapshot.get("distance")+")";
        setSub(temp);
        //setDesc(queryDocumentSnapshot.get("longDesc"));

    } else {
        setTitle("Nincs több Értesítés");
        setSub("");
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
              <IonBackButton defaultHref="/agendamenu"></IonBackButton>
              {/*<IonMenuButton />*/}
            </IonButtons>
              <IonTitle>Árajánlat kezelése</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="kontent">

        {(() => {
          if (sub=="") {
            return(
            <IonItem>
            <IonCard>
            <IonCardHeader>
              <IonCardTitle align="center">{title} </IonCardTitle>
              <IonCardSubtitle align="center">{sub} </IonCardSubtitle>

            </IonCardHeader>

            <IonCardContent>
            <img src="https://3dwarehouse.sketchup.com/warehouse/v1.0/publiccontent/33b74c22-267d-4c88-9fc0-7b2a6908b918" />
            </IonCardContent>

            </IonCard>
            </IonItem>
          )
          }
          else {
            return(
              <>
              <IonItemSliding align="center" onIonDrag={(e) => setTimeout(() => {handleSlide(e)},1500)}>
                <IonItemOptions side="end">
                  <IonItemOption color="danger">Elutasit</IonItemOption>
                </IonItemOptions>
                <IonItem>
                  <IonCard>
                    <IonCardHeader>
                      <IonCardTitle align="center">{title} </IonCardTitle>
                      <IonCardSubtitle align="center">{sub} </IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>
                      <img src="https://3dwarehouse.sketchup.com/warehouse/v1.0/publiccontent/33b74c22-267d-4c88-9fc0-7b2a6908b918" />
                    </IonCardContent>

                  </IonCard>
                </IonItem>
                <IonItemOptions side="start">
                  <IonItemOption color="green">Elfogad</IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
              <div align="center">
              <IonButton color="yellow"  onClick={()=>{Varakoztat();}}>Várakoztatás</IonButton>
              </div>
          </>)
          }
        })()}





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
