import React, { useEffect, useState } from 'react';
import {Inject, ScheduleComponent,
        Day, Week, WorkWeek, Month, Agenda,
        EventSettingsModel} from '@syncfusion/ej2-react-schedule';
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
  IonButton
} from '@ionic/react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
import fire from './fire';



const AgendaMenu = () => {
  const proba=Cookies.get('log');

  var db = fire.firestore();

  var scheduleObj: ScheduleComponent;

  var events = [];
  var years = [];
  var months = [];
  var days = [];

  var localData: EventSettingsModel = {
    allowDeleting: true,
    allowEditing: true,
    fields: {
      subject: { name: 'Summary', default: 'Nincs megadva.'},
      startTime: { name: 'Start'},
      endTime: { name: 'End'}
    }
  };


  db.collection("AcceptedRequests")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            years.push(parseInt(doc.get("Year")));
            months.push(parseInt(doc.get("Month"))-1);
            days.push(parseInt(doc.get("Day")));
            events.push(doc.get("desc"));
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
  });

  /*const saveChanges = () => {
    db.collection("AcceptedRequests").listDocuments().then(val => {
        val.map((val) => {
            val.delete()
        })
    })
    for (var j=0;j<events.length;j++){
      db.collection("AcceptedRequests").add({
        Year: years[j],
        Month: months[j]+1,
        Day: days[j],
        desc: events[j]
      })
    }
  }*/

  const addData = () => {
    for (var j=0;j<events.length;j++){
      let eventData:{[key: string]: Object} = {
        Summary: events[j],
        End: new Date(years[j],months[j],days[j],23,59),
        Start: new Date(years[j],months[j],days[j],0,0),
        IsAllDay: true
      };
      scheduleObj.addEvent(eventData);
    }
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
              <IonTitle>Napirend</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <ScheduleComponent ref={schedule => scheduleObj = schedule} as ScheduleComponent
            currentView='Month' eventSettings={localData}>
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
              <IonButton onClick={(e) => addData()}>Események lekérése</IonButton>
            </ScheduleComponent>
            {/*<IonButton onClick={(e) => saveChanges()}>Változtatások mentése</IonButton>*/}
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
export default AgendaMenu;
