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
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonCardHeader,
  IonInput
} from '@ionic/react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
import fire from './fire';
import { isPlatform } from '@ionic/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AgendaMenu = () => {
  const [today, setToday] = useState(new Date());
  const [month,setMonth] = useState("");
  const [monthNum,setMonthNum] = useState(new Date().getMonth());
  const proba=Cookies.get('log');
  const [weekNum,setWeekNum]=useState(0);
  const [startingDay,setStartingDay]=useState(new Date());
  const [day2,setDay2]=useState(new Date());
  const [day3,setDay3]=useState(new Date());
  const [day4,setDay4]=useState(new Date());
  const [day5,setDay5]=useState(new Date());
  const [day6,setDay6]=useState(new Date());
  const [day7,setDay7]=useState(new Date());
  const [viewState,setViewState]=useState("0");

  const [hely, setHely] = useState("");
  const [nem, setNem] = useState("");
  const [sentState,setSentState] = useState(0);
  const [addDate, setAddDate] = useState(new Date());

  var db = fire.firestore();



  var scheduleObj;
  var d= new Date();

  var events = [];
  var years = [];
  var months = [];
  var days = [];
  var ids = [];

  let monthNumber = (new Date().getMonth());
  let monthNames = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
  let monthName = monthNames[monthNumber];

  var localData = {
    allowDeleting: true,
    allowEditing: true,
    fields: {
      subject: { name: 'Summary', default: 'Nincs megadva.'},
      startTime: { name: 'Start'},
      endTime: { name: 'End'}
    }
  };

  Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
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
          console.log(events[j]);
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

  useEffect(() => {
    startingDay.setDate(startingDay.getDate()-(startingDay.getDay()-1));
    day2.setDate(startingDay.getDate()+1);
    day3.setDate(startingDay.getDate()+2);
    day4.setDate(startingDay.getDate()+3);
    day5.setDate(startingDay.getDate()+4);
    day6.setDate(startingDay.getDate()+5);
    day7.setDate(startingDay.getDate()+6);
    setMonth(monthName);
    setWeekNum(new Date().getWeek());
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
            if (viewState=="0"){
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
                  <IonIcon icon={arrowBackOutline} onClick={()=>{setWeekNum(weekNum-1);
                                                                 today.setDate(today.getDate()-7);
                                                                 setMonthNum(today.getMonth());
                                                                 setMonth(monthNames[today.getMonth()]);
                                                                 startingDay.setDate(startingDay.getDate()-7);
                                                                 day2.setDate(startingDay.getDate()+1);
                                                                 day3.setDate(startingDay.getDate()+2);
                                                                 day4.setDate(startingDay.getDate()+3);
                                                                 day5.setDate(startingDay.getDate()+4);
                                                                 day6.setDate(startingDay.getDate()+5);
                                                                 day7.setDate(startingDay.getDate()+6);}} className="rolunk" slot="start" />
                  <IonIcon icon={arrowForwardOutline} onClick={()=>{setWeekNum(weekNum+1);
                                                                    today.setDate(today.getDate()+7);
                                                                    setMonthNum(today.getMonth());
                                                                    setMonth(monthNames[today.getMonth()]);
                                                                    startingDay.setDate(startingDay.getDate()+7);
                                                                    day2.setDate(startingDay.getDate()+1);
                                                                    day3.setDate(startingDay.getDate()+2);
                                                                    day4.setDate(startingDay.getDate()+3);
                                                                    day5.setDate(startingDay.getDate()+4);
                                                                    day6.setDate(startingDay.getDate()+5);
                                                                    day7.setDate(startingDay.getDate()+6);}} className="rolunk" slot="end" />
                  {/*<IonMenuButton />*/}
                  <IonTitle>{month}<br/>{weekNum}. hét{}</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent>
<table width="100%" className="tg">
<thead>
  <tr>
    <th width="15%" className="tg-0lax">H<br/>{startingDay.getDate()}</th>
    <th width="75%" className="tg-1lax" onClick={()=>{setViewState("add");}}>+<br/>&nbsp;&nbsp;&nbsp;&nbsp;{days[1]}</th>
    <th width="10%" className="tg-0lax" onClick={()=>{setViewState("del");}}>-</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td className="tg-2lax">K<br/>{day2.getDate()}</td>
    <td className="tg-3lax" onClick={()=>{setViewState("add");}}>+<br/>&nbsp;&nbsp;&nbsp;&nbsp;Ajka - Sávalap ásás</td>
    <td className="tg-2lax" onClick={()=>{setViewState("del");}}>-</td>
  </tr>
  <tr>
    <td className="tg-0lax">SZ<br/>{day3.getDate()}</td>
    <td className="tg-1lax" onClick={()=>{setViewState("add");}}>+<br/>&nbsp;&nbsp;&nbsp;&nbsp;Ajka - Sávalap ásás</td>
    <td className="tg-0lax" onClick={()=>{setViewState("del");}}>-</td>
  </tr>
  <tr>
    <td className="tg-2lax">CS<br/>{day4.getDate()}</td>
    <td className="tg-3lax" onClick={()=>{setViewState("add");}}>+<br/>&nbsp;&nbsp;&nbsp;&nbsp;Ajka - Sávalap ásás</td>
    <td className="tg-2lax" onClick={()=>{setViewState("del");}}>-</td>
  </tr>
  <tr>
    <td className="tg-0lax">P<br/>{day5.getDate()}</td>
    <td className="tg-1lax" onClick={()=>{setViewState("add");}}>+<br/>&nbsp;&nbsp;&nbsp;&nbsp;Ajka - Sávalap ásás</td>
    <td className="tg-0lax" onClick={()=>{setViewState("del");}}>-</td>
  </tr>
  <tr>
    <td className="tg-2lax">SZ<br/>{day6.getDate()}</td>
    <td className="tg-3lax" onClick={()=>{setViewState("add");}}>+<br/>&nbsp;&nbsp;&nbsp;&nbsp;Ajka - Sávalap ásás</td>
    <td className="tg-2lax" onClick={()=>{setViewState("del");}}>-</td>
  </tr>
  <tr>
    <td className="tg-0lax">V<br/>{day7.getDate()}</td>
    <td className="tg-1lax" onClick={()=>{setViewState("add");}}>+<br/>&nbsp;&nbsp;&nbsp;&nbsp;Ajka - Sávalap ásás</td>
    <td className="tg-0lax" onClick={()=>{setViewState("del");}}>-</td>
  </tr>
</tbody>
</table>
            {/*  <IonList>
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
              */}
              </IonContent>
              </>
            )
          } else if (viewState=="add") {
            return(
              <>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle align="center">Esemény manuális hozzáadása </IonCardTitle>
                  <IonCardSubtitle align="center">Az esemény a választott naphoz lesz hozzáadva</IonCardSubtitle>
                  <IonItem>
                    <IonLabel>Munkavégzés helye:</IonLabel>
                    <IonInput value={hely} onIonChange={(e) => {setHely(e.target.value)}}/>
                  </IonItem>
                  <IonItem>
                    <IonLabel>Munkanem:</IonLabel>
                    <IonInput value={nem} onIonChange={(e) => {setNem(e.target.value)}}/>
                  </IonItem>
                  <h1>Határidő:</h1>
                  <div align="center">
                    <Calendar align="center" onChange={onDateChange} value={addDate} minDate={new Date()}/>
                  </div>
                  <br/>
                  <br/>
                  <div align="center">
                    <IonButton align="center" onClick={()=>{Hozzaad("Farkasgyepű",hely);}}>Hozzáadás</IonButton>
                    <IonButton onClick={()=>{setViewState("0");}}>Vissza</IonButton>
                  </div>
                  {(() => {
                    if (sentState==1) {
                      return(
                        <p className="successMsg" align="center">Esemény sikeresen hozzáadva!</p>
                      )
                    }else if (sentState==-2) {
                      return(
                        <p className="errorMsg" align="center">Kérem adjon meg egy munkanemet!</p>
                      );
                    }else if (sentState==-1) {
                      return(
                        <p className="errorMsg" align="center">Kérem adjon meg egy létező várost!</p>
                      );
                    }
                  })()}
                  <br/>
                  <br/>
                </IonCardHeader>
              </IonCard>
              </>
            )
          }else if (viewState=="del") {
            return(
              <>
              <p>Delete stuff here</p>
              <IonButton onClick={()=>{setViewState("0");}}>Vissza</IonButton>
              </>
            )
          }
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
