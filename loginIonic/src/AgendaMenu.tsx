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

  var scheduleObj: ScheduleComponent;

  var events: string[] = [];
  var years: number[] = [];
  var months: number[] = [];
  var days: number[] = [];
  var ids: string[] = [];


  var localData: EventSettingsModel = {
    allowDeleting: true,
    allowEditing: true,
    fields: {
      subject: { name: 'Summary', default: 'Nincs megadva.'},
      startTime: { name: 'Start'},
      endTime: { name: 'End'}
    }
  };

  var deleted: ActionEventArgs = {

  }



  const saveChanges = () => {
    console.log(deleted.deletedRecords);
    /*let deleted:{[key: string]: Object} = deletedRecords;*/
    for (var j=0;j<events.length;j++){
      db.collection("Requests").doc(ids[j]).delete().then(function() {
          console.log("Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
    }
    for (var j=0;j<events.length;j++){
      db.collection("Requests").add({
        Year: years[j],
        Month: months[j]+1,
        Day: days[j],
        desc: events[j]
      })
    }
  }


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
              events.push(doc.get("longDesc"));
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
          let eventData:{[key: string]: Object} = {
            id: ids[j],
            Summary: events[j],
            End: new Date(years[j],months[j],days[j],23,59),
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
