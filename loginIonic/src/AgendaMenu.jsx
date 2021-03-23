import React, { useEffect, useState } from 'react';
import {Inject, ScheduleComponent,
        Day, Week, WorkWeek, Month, Agenda,
        EventSettingsModel, ActionEventArgs} from '@syncfusion/ej2-react-schedule';
import {arrowBackOutline,arrowForwardOutline,addOutline,removeOutline,addCircleOutline,removeCircleOutline} from 'ionicons/icons';
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
  IonIcon,
  IonLabel,
  IonCard,
  IonItemDivider,
  IonCardTitle
} from '@ionic/react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
import fire from './fire';
import { isPlatform } from '@ionic/react';


const AgendaMenu = () => {
  const proba=Cookies.get('log');
  const [weekNum,setWeekNum]=useState(0);
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
          if (isPlatform('desktop')){
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
            )}
          else {
            return(
              <>

              <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton defaultHref="/"></IonBackButton>
                  {/*<IonMenuButton />*/}
                </IonButtons>
                  <IonTitle>Napirend</IonTitle>
                </IonToolbar>

                <IonToolbar color="secondary">
                  <IonIcon icon={arrowBackOutline} className="rolunk" slot="start" />
                  <IonIcon icon={arrowForwardOutline} className="rolunk" slot="end" />
                  {/*<IonMenuButton />*/}
                  <IonTitle>{weekNum}. hét</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent>
{/*
<table width="100%" class="tg">
<thead>
  <tr>
    <th width="10%" class="tg-0lax">+</th>
    <th width="15%" class="tg-0lax">1<br/>H</th>
    <th width="65%" class="tg-1lax">Ajka - Sávalap ásás</th>
    <th width="10%" class="tg-0lax">-</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-2lax">+</td>
    <td class="tg-2lax">1<br/>H</td>
    <td class="tg-3lax">Ajka - Sávalap ásás</td>
    <td class="tg-2lax">-</td>
  </tr>
  <tr>
    <td class="tg-0lax">+</td>
    <td class="tg-0lax">1<br/>H</td>
    <td class="tg-1lax">Ajka - Sávalap ásás</td>
    <td class="tg-0lax">-</td>
  </tr>
  <tr>
    <td class="tg-2lax">+</td>
    <td class="tg-2lax">1<br/>H</td>
    <td class="tg-3lax">Ajka - Sávalap ásás</td>
    <td class="tg-2lax">-</td>
  </tr>
  <tr>
    <td class="tg-0lax">+</td>
    <td class="tg-0lax">1<br/>H</td>
    <td class="tg-1lax">Ajka - Sávalap ásás</td>
    <td class="tg-0lax">-</td>
  </tr>
  <tr>
    <td class="tg-2lax">+</td>
    <td class="tg-2lax">1<br/>H</td>
    <td class="tg-3lax">Ajka - Sávalap ásás</td>
    <td class="tg-2lax">-</td>
  </tr>
  <tr>
    <td class="tg-0lax">+</td>
    <td class="tg-0lax">1<br/>H</td>
    <td class="tg-1lax">Ajka - Sávalap ásás</td>
    <td class="tg-0lax">-</td>
  </tr>
</tbody>
</table> */}
              <IonList>
                <IonItemDivider>
                <IonIcon icon={addCircleOutline} className="rolunk" slot="start" />
                <IonIcon icon={removeCircleOutline} className="rolunk" slot="end" />
                  <IonCard>
                  <IonCardTitle>
                    1
                    H
                  </IonCardTitle>
                  </IonCard>
                  <IonLabel>
                    Secondary Item Divider
                  </IonLabel>
                </IonItemDivider>

                <IonItemDivider color="secondary">
                <IonIcon icon={addCircleOutline} className="rolunk" slot="start" />
                <IonIcon icon={removeCircleOutline} className="rolunk" slot="end" />
                  <IonCard>
                  <IonCardTitle>
                    1
                    H
                  </IonCardTitle>
                  </IonCard>
                  <IonLabel>
                    Secondary Item Divider
                  </IonLabel>
                </IonItemDivider>

                <IonItemDivider>
                <IonIcon icon={addCircleOutline} className="rolunk" slot="start" />
                <IonIcon icon={removeCircleOutline} className="rolunk" slot="end" />
                  <IonCard>
                  <IonCardTitle>
                    1
                    H
                  </IonCardTitle>
                  </IonCard>
                  <IonLabel>
                    Secondary Item Divider
                  </IonLabel>
                </IonItemDivider>
                <IonItemDivider color="secondary">
                  <IonCard>
                    1 CS
                  </IonCard>
                  <IonLabel>
                    Secondary Item Divider
                  </IonLabel>
                </IonItemDivider>
                <IonItemDivider>
                  <IonCard>
                    1 P
                  </IonCard>
                  <IonLabel>
                    Secondary Item Divider
                  </IonLabel>
                </IonItemDivider>
                <IonItemDivider color="secondary">
                  <IonCard>
                    1 SZ
                  </IonCard>
                  <IonLabel>
                    Secondary Item Divider
                  </IonLabel>
                </IonItemDivider>
                <IonItemDivider slot="start">
                  <IonCard>
                    1 V
                  </IonCard>
                  <IonLabel>
                    Secondary Item Divider
                  </IonLabel>
                </IonItemDivider>
              </IonList>

              </IonContent>
              </>
            )
          }


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
