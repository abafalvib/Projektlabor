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
  IonButton
} from '@ionic/react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
import fire from './fire';



const AgendaMenu = () => {
  const proba=Cookies.get('log');

  var db = fire.firestore();

  var scheduleObj;

  var events = [];
  var years = [];
  var months = [];
  var days = [];
  var ids = [];


  var localData = {
    allowDeleting: true,
    allowEditing: true,
    fields: {
      subject: { name: 'Summary', default: 'Nincs megadva.'},
      startTime: { name: 'Start'},
      endTime: { name: 'End'}
    }
  };


  useEffect(() => {
    db.collection("Requests")
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (doc.get("elfogadva")) {
              // doc.data() is never undefined for query doc snapshots
              var t = doc.get("date").toDate();

              years.push(parseInt(t.getFullYear()));
              months.push(parseInt(t.getMonth()));
              days.push(parseInt(t.getDate()));
              events.push(doc.get("location")+": "+doc.get("desc"));
              ids.push(doc.id);
/*
              years.push(parseInt(doc.get("Year")));
              months.push(parseInt(doc.get("Month"))-1);
              days.push(parseInt(doc.get("Day")));
              events.push(doc.get("longDesc"));
              ids.push(doc.id);*/
            }
          });
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      }).finally(function() {
        for (var j=0;j<events.length;j++){
          let eventData = {
            id: ids[j],
            Summary: events[j],
            End: new Date(years[j],months[j],days[j],0,0),
            Start: new Date(years[j],months[j],days[j],0,0),
            IsAllDay: true
          };
          if (scheduleObj) {
            scheduleObj.addEvent(eventData);
          }
        };
      });
  }, []);


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
            </ScheduleComponent>
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
