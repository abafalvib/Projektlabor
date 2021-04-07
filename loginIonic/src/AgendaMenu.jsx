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

  const [startingText,setStartingText]=useState("");
  const [text2,setText2]=useState("");
  const [text3,setText3]=useState("");
  const [text4,setText4]=useState("");
  const [text5,setText5]=useState("");
  const [text6,setText6]=useState("");
  const [text7,setText7]=useState("");

  const [viewState,setViewState]=useState("0");
  const [eventList,setEventList]=useState([]);

  const [hely, setHely] = useState("");
  const [nem, setNem] = useState("");
  const [sentState,setSentState] = useState(0);
  const [addDate, setAddDate] = useState(new Date());

  var db = fire.firestore();



  var scheduleObj;
  var d= new Date();

  let events = [];
  let events2 = [];
  var years = [];
  var months = [];
  var days = [];
  var ids = [];
  let dates=[];

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
    let t1="";
    let t2="";
    let t3="";
    let t4="";
    let t5="";
    let t6="";
    let t7="";
    db.collection("Requests")
      .get()
      .then(function(querySnapshot) {
          startingDay.setDate(startingDay.getDate()-(startingDay.getDay()-1));
          startingDay.setHours(1,1,1,1);
          day2.setDate(startingDay.getDate()+1);
          day3.setDate(startingDay.getDate()+2);
          day4.setDate(startingDay.getDate()+3);
          day5.setDate(startingDay.getDate()+4);
          day6.setDate(startingDay.getDate()+5);
          day7.setDate(startingDay.getDate()+6);
          setMonth(monthName);
          setWeekNum(new Date().getWeek());

          querySnapshot.forEach(function(doc) {
            if (doc.get("elfogadva")) {
              // doc.data() is never undefined for query doc snapshots
              var t = doc.get("date").toDate();

              years.push(parseInt(t.getFullYear()));
              months.push(parseInt(t.getMonth()));
              days.push(parseInt(t.getDate()));
              events.push(doc.get("location")+": "+doc.get("desc"));
              ids.push(doc.id);

              if (doc.get("elfogadva")&&doc.get("date").toDate().getFullYear()==startingDay.getFullYear()
                  &&doc.get("date").toDate().getMonth()==startingDay.getMonth()&&doc.get("date").toDate().getDate()==startingDay.getDate()) {
                    t1+=doc.get("location")+": "+doc.get("desc")+"\n";
              }
              if (doc.get("elfogadva")&&doc.get("date").toDate().getFullYear()==day2.getFullYear()
                  &&doc.get("date").toDate().getMonth()==day2.getMonth()&&doc.get("date").toDate().getDate()==day2.getDate()) {
                    t2+=doc.get("location")+": "+doc.get("desc")+"\n";
              }
              if (doc.get("elfogadva")&&doc.get("date").toDate().getFullYear()==day3.getFullYear()
                  &&doc.get("date").toDate().getMonth()==day3.getMonth()&&doc.get("date").toDate().getDate()==day3.getDate()) {
                    t3+=doc.get("location")+": "+doc.get("desc")+"\n";
              }
              if (doc.get("elfogadva")&&doc.get("date").toDate().getFullYear()==day4.getFullYear()
                  &&doc.get("date").toDate().getMonth()==day4.getMonth()&&doc.get("date").toDate().getDate()==day4.getDate()) {
                    t4+=doc.get("location")+": "+doc.get("desc")+"\n";
              }
              if (doc.get("elfogadva")&&doc.get("date").toDate().getFullYear()==day5.getFullYear()
                  &&doc.get("date").toDate().getMonth()==day5.getMonth()&&doc.get("date").toDate().getDate()==day5.getDate()) {
                    t5+=doc.get("location")+": "+doc.get("desc")+"\n";
              }
              if (doc.get("elfogadva")&&doc.get("date").toDate().getFullYear()==day6.getFullYear()
                  &&doc.get("date").toDate().getMonth()==day6.getMonth()&&doc.get("date").toDate().getDate()==day6.getDate()) {
                    t6+=doc.get("location")+": "+doc.get("desc")+"\n";
              }
              if (doc.get("elfogadva")&&doc.get("date").toDate().getFullYear()==day7.getFullYear()
                  &&doc.get("date").toDate().getMonth()==day7.getMonth()&&doc.get("date").toDate().getDate()==day7.getDate()) {
                    t7+=doc.get("location")+": "+doc.get("desc")+"\n";
              }
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
          setStartingText(t1);
          setText2(t2);
          setText3(t3);
          setText4(t4);
          setText5(t5);
          setText6(t6);
          setText7(t7);
        };
      });



  }, []);


  function loadData(){
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
        let eventList2 = [];
        for (var j=0;j<events.length;j++){
          dates.push(new Date(years[j],months[j],days[j]));
          eventList2[new Date(years[j],months[j],days[j])]=events[j];
        };
        console.log(eventList2[new Date(years[1],months[1],days[1])]);
        return eventList2;
      });
  }

  function rewrite(d1,d2,d3,d4,d5,d6,d7){
    let t1="";
    let t2="";
    let t3="";
    let t4="";
    let t5="";
    let t6="";
    let t7="";
    db.collection("Requests")
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (doc.get("elfogadva")) {
              // doc.data() is never undefined for query doc snapshots

              if (doc.get("elfogadva")&&doc.get("date").toDate().getFullYear()==d1.getFullYear()
                  &&doc.get("date").toDate().getMonth()==d1.getMonth()&&doc.get("date").toDate().getDate()==d1.getDate()) {
                    t1+=doc.get("location")+": "+doc.get("desc")+"\n";
              }
              if (doc.get("elfogadva")&&doc.get("date").toDate().getFullYear()==d2.getFullYear()
                  &&doc.get("date").toDate().getMonth()==d2.getMonth()&&doc.get("date").toDate().getDate()==d2.getDate()) {
                    t2+=doc.get("location")+": "+doc.get("desc")+"\n";
              }
              if (doc.get("elfogadva")&&doc.get("date").toDate().getFullYear()==d3.getFullYear()
                  &&doc.get("date").toDate().getMonth()==d3.getMonth()&&doc.get("date").toDate().getDate()==d3.getDate()) {
                    t3+=doc.get("location")+": "+doc.get("desc")+"\n";
              }
              if (doc.get("elfogadva")&&doc.get("date").toDate().getFullYear()==d4.getFullYear()
                  &&doc.get("date").toDate().getMonth()==d4.getMonth()&&doc.get("date").toDate().getDate()==d4.getDate()) {
                    t4+=doc.get("location")+": "+doc.get("desc")+"\n";
              }
              if (doc.get("elfogadva")&&doc.get("date").toDate().getFullYear()==d5.getFullYear()
                  &&doc.get("date").toDate().getMonth()==d5.getMonth()&&doc.get("date").toDate().getDate()==d5.getDate()) {
                    t5+=doc.get("location")+": "+doc.get("desc")+"\n";
              }
              if (doc.get("elfogadva")&&doc.get("date").toDate().getFullYear()==d6.getFullYear()
                  &&doc.get("date").toDate().getMonth()==d6.getMonth()&&doc.get("date").toDate().getDate()==d6.getDate()) {
                    t6+=doc.get("location")+": "+doc.get("desc")+"\n";
              }
              if (doc.get("elfogadva")&&doc.get("date").toDate().getFullYear()==d7.getFullYear()
                  &&doc.get("date").toDate().getMonth()==d7.getMonth()&&doc.get("date").toDate().getDate()==d7.getDate()) {
                    t7+=doc.get("location")+": "+doc.get("desc")+"\n";
              }
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
          setStartingText(t1);
          setText2(t2);
          setText3(t3);
          setText4(t4);
          setText5(t5);
          setText6(t6);
          setText7(t7);
      });
  }


  function writeDay(d){
    let correctEvents=[];
    let d2=new Date(d);
    d2.setMonth(d.getMonth()-1);
    //console.log(d2);
    db.collection("Requests")
      .get()
      .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (doc.get("elfogadva")&&doc.get("date").toDate().getFullYear()==d.getFullYear()
                &&doc.get("date").toDate().getMonth()==d.getMonth()&&doc.get("date").toDate().getDate()==d.getDate()) {
              // doc.data() is never undefined for query doc snapshots

              correctEvents.push(doc.get("location")+": "+doc.get("desc"));
              //console.log(doc.get("location")+": "+doc.get("desc")+doc.get("date").toDate().getFullYear()+doc.get("date").toDate().getMonth()+doc.get("date").toDate().getDate())
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
        var res="";
        if (correctEvents!=null){
          correctEvents.forEach(element => res=res+(element)+"\n"+"    ");
          console.log(res);
          if (res!=""){
            setStartingText(res);
          }
        }

      });
  }

  {/*useEffect(() => {

  }, []);*/}


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
                  <IonIcon icon={arrowBackOutline} onClick={()=>{if(weekNum>0) {setWeekNum(weekNum-1);



                                                                 today.setDate(today.getDate()-7);
                                                                 setMonthNum(today.getMonth());
                                                                 setMonth(monthNames[today.getMonth()]);
                                                                 var tempDay=new Date(startingDay.getTime()-7*1000*60*60*24);


                                                                 setStartingDay(new Date(startingDay.getTime()-7*1000*60*60*24));

                                                                 setDay2(new Date(tempDay.getTime()+1*1000*60*60*24));
                                                                 setDay3(new Date(tempDay.getTime()+2*1000*60*60*24));
                                                                 setDay4(new Date(tempDay.getTime()+3*1000*60*60*24));
                                                                 setDay5(new Date(tempDay.getTime()+4*1000*60*60*24));
                                                                 setDay6(new Date(tempDay.getTime()+5*1000*60*60*24));
                                                                 setDay7(new Date(tempDay.getTime()+6*1000*60*60*24));
                                                                 var tempDay2=new Date(tempDay.getTime()+1*1000*60*60*24);
                                                                 var tempDay3=new Date(tempDay.getTime()+2*1000*60*60*24);
                                                                 var tempDay4=new Date(tempDay.getTime()+3*1000*60*60*24);
                                                                 var tempDay5=new Date(tempDay.getTime()+4*1000*60*60*24);
                                                                 var tempDay6=new Date(tempDay.getTime()+5*1000*60*60*24);
                                                                 var tempDay7=new Date(tempDay.getTime()+6*1000*60*60*24);
                                                                 rewrite(tempDay,tempDay2,tempDay3,tempDay4,tempDay5,tempDay6,tempDay7);}}} className="rolunk" slot="start" />

                  <IonIcon icon={arrowForwardOutline} onClick={()=>{if(weekNum<52) {setWeekNum(weekNum+1);
                                                                    today.setDate(today.getDate()+7);
                                                                    setMonthNum(today.getMonth());
                                                                    setMonth(monthNames[today.getMonth()]);
                                                                    var tempDay=new Date(startingDay.getTime()+7*1000*60*60*24);

                                                                    setStartingDay(new Date(startingDay.getTime()+7*1000*60*60*24));

                                                                    setDay2(new Date(tempDay.getTime()+1*1000*60*60*24));
                                                                    setDay3(new Date(tempDay.getTime()+2*1000*60*60*24));
                                                                    setDay4(new Date(tempDay.getTime()+3*1000*60*60*24));
                                                                    setDay5(new Date(tempDay.getTime()+4*1000*60*60*24));
                                                                    setDay6(new Date(tempDay.getTime()+5*1000*60*60*24));
                                                                    setDay7(new Date(tempDay.getTime()+6*1000*60*60*24));
                                                                    var tempDay2=new Date(tempDay.getTime()+1*1000*60*60*24);
                                                                    var tempDay3=new Date(tempDay.getTime()+2*1000*60*60*24);
                                                                    var tempDay4=new Date(tempDay.getTime()+3*1000*60*60*24);
                                                                    var tempDay5=new Date(tempDay.getTime()+4*1000*60*60*24);
                                                                    var tempDay6=new Date(tempDay.getTime()+5*1000*60*60*24);
                                                                    var tempDay7=new Date(tempDay.getTime()+6*1000*60*60*24);
                                                                    rewrite(tempDay,tempDay2,tempDay3,tempDay4,tempDay5,tempDay6,tempDay7);}}} className="rolunk" slot="end" />
                  {/*<IonMenuButton />*/}
                  <IonTitle>{month}<br/>{weekNum}. hét{}</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent>
<table width="100%" className="tg">
<thead>
  <tr>
    <th width="15%" className="tg-0lax" onClick={()=>{loadData();}}>H<br/>{startingDay.getDate()}</th>
    <th width="75%" className="tg-1lax" onClick={()=>{setViewState("add");}}>+<br/>&nbsp;&nbsp;&nbsp;&nbsp;{startingText}</th>
    <th width="10%" className="tg-0lax" onClick={()=>{setViewState("del");}}>-</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td className="tg-2lax">K<br/>{day2.getDate()}</td>
    <td className="tg-3lax" onClick={()=>{setViewState("add");}}>+<br/>&nbsp;&nbsp;&nbsp;&nbsp;{text2}</td>
    <td className="tg-2lax" onClick={()=>{setViewState("del");}}>-</td>
  </tr>
  <tr>
    <td className="tg-0lax">SZ<br/>{day3.getDate()}</td>
    <td className="tg-1lax" onClick={()=>{setViewState("add");}}>+<br/>&nbsp;&nbsp;&nbsp;&nbsp;{text3}</td>
    <td className="tg-0lax" onClick={()=>{setViewState("del");}}>-</td>
  </tr>
  <tr>
    <td className="tg-2lax">CS<br/>{day4.getDate()}</td>
    <td className="tg-3lax" onClick={()=>{setViewState("add");}}>+<br/>&nbsp;&nbsp;&nbsp;&nbsp;{text4}</td>
    <td className="tg-2lax" onClick={()=>{setViewState("del");}}>-</td>
  </tr>
  <tr>
    <td className="tg-0lax">P<br/>{day5.getDate()}</td>
    <td className="tg-1lax" onClick={()=>{setViewState("add");}}>+<br/>&nbsp;&nbsp;&nbsp;&nbsp;{text5}</td>
    <td className="tg-0lax" onClick={()=>{setViewState("del");}}>-</td>
  </tr>
  <tr>
    <td className="tg-2lax">SZ<br/>{day6.getDate()}</td>
    <td className="tg-3lax" onClick={()=>{setViewState("add");}}>+<br/>&nbsp;&nbsp;&nbsp;&nbsp;{text6}</td>
    <td className="tg-2lax" onClick={()=>{setViewState("del");}}>-</td>
  </tr>
  <tr>
    <td className="tg-0lax">V<br/>{day7.getDate()}</td>
    <td className="tg-1lax" onClick={()=>{setViewState("add");}}>+<br/>&nbsp;&nbsp;&nbsp;&nbsp;{text7}</td>
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
