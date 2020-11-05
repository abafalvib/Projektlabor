import React, { useEffect, useState } from 'react';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonList,
  IonItem,
  IonBackButton,
  IonButtons,
  IonLabel,
  IonButton,
  IonRadio,
  IonRadioGroup,
  IonGrid,
  IonCol,
  IonRow,
  IonInput,
  IonSelect,
  IonSelectOption
} from '@ionic/react';

import fire from './fire';

import Calendar from 'react-calendar';
import myCalendar from './components/Calendar';
import 'react-calendar/dist/Calendar.css';

export const Bid: React.FC = () => {
  const [ selected, setSelected ] = useState('');
  const [date, setDate] = useState(new Date());
  const [today, setToday] = useState(new Date());
  const [safolyom, setSafolyom] = useState(0);
  const [sakanalm, setSakanalm] = useState(0);
  const [hkdfolyom,setHkdfolyom] = useState(0);
  const [taenegyzetm, setTaenegyzetm] = useState(0);
  const [tekobm, setTekobm] = useState(0);
  const [tanegyzetm, setTanegyzetm] = useState(0);
  const [email, setEmail] = useState('');
  const [tav, setTav] = useState(0);

  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);
  const [fourth, setFourth] = useState(0);
  const [fifth, setFifth] = useState(0);

  const onDateChange = date => {
    setDate(date);
  };

  var db = fire.firestore();
  var docRef = db.collection("AdminData").doc("e7U5eti6iZbTraUz57vu");
  useEffect(() => {var db = fire.firestore("");
  var docRef = db.collection("AdminData").doc("e7U5eti6iZbTraUz57vu");
  docRef.get().then(function(doc) {
      if (doc.exists) {
          setFirst(parseInt(doc.get("First")));
          setSecond(parseInt(doc.get("Second")));
          setThird(parseInt(doc.get("Third")));
          setFourth(parseInt(doc.get("Fourth")));
          setFifth(parseInt(doc.get("Fifth")));
          } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });}, []);


  let folyom;
  if (selected=="Sávalap ásás") {
    folyom = Number(safolyom);
  } else if (selected=="Ház körüli drainezés"){
    folyom = Number(hkdfolyom);
  } else {
    folyom = 0;
  }

  let kanalm;
  if (selected=="Sávalap ásás") {
    kanalm = Number(sakanalm);
  } else {
    kanalm = 0;
  }

  let negyzetm;
  if (selected=="Térkő alap előkészítés") {
    negyzetm = Number(taenegyzetm);
  } else if (selected=="Tüköralap"){
    negyzetm = Number(tanegyzetm);
  } else {
    negyzetm = 0;
  }

  let kobm;
  if (selected=="Törmelék elhordás") {
    kobm = Number(tekobm);
  } else {
    kobm = 0;
  }




  let koltseg;
  switch (selected) {
    case 'Sávalap ásás':
      koltseg=folyom *  first * (100 + kanalm) /100;
      break;
    case 'Ház körüli drainezés':
      koltseg=folyom * second;
      break;
    case 'Térkő alap előkészítés':
      koltseg=negyzetm * third;
      break;
    case 'Törmelék elhordás':
      koltseg=kobm * fourth;
      break;
    case 'Tüköralap':
      koltseg=negyzetm * fifth;
      break;
    default:
      koltseg=0;
      break;
  }

  return(
  <>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
        </IonButtons>
        <IonTitle>Árajánlat</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
    <IonList>
    <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
          <IonItem>
            <IonLabel>Sávalap ásás</IonLabel>
            <IonRadio slot="start" value="Sávalap ásás" />
          </IonItem>
          <IonItem>
            <IonLabel>Ház körüli drainezés</IonLabel>
            <IonRadio slot="start" value="Ház körüli drainezés" />
          </IonItem>
          <IonItem>
            <IonLabel>Térkő alap előkészítés</IonLabel>
            <IonRadio slot="start" value="Térkő alap előkészítés" />
          </IonItem>
          <IonItem>
            <IonLabel>Törmelék elhordás</IonLabel>
            <IonRadio slot="start" value="Törmelék elhordás" />
          </IonItem>
          <IonItem>
            <IonLabel>Tüköralap</IonLabel>
            <IonRadio slot="start" value="Tüköralap" />
          </IonItem>
          <IonItem>
            <IonLabel>Tereprendezés</IonLabel>
            <IonRadio slot="start" value="Tereprendezés" />
          </IonItem>
          <IonItem>
            <IonLabel>Medence ásás</IonLabel>
            <IonRadio slot="start" value="Medence ásás" />
          </IonItem>
          <IonItem>
            <IonLabel>Közműbeásás</IonLabel>
            <IonRadio slot="start" value="Közműbeásás" />
          </IonItem>

          </IonRadioGroup>

        </IonList>

        <div className="Parameters"> {(() => {
          switch(selected)
            {
            case 'Sávalap ásás':
            return (
              <>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Folyóméter:</IonLabel>
                        <IonInput type="number" value={safolyom} onIonChange={(e) => setSafolyom(e.target.value)}/>
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Kanálméret:</IonLabel>
                        <IonSelect value={sakanalm} onIonChange={(e) => setSakanalm(e.target.value)}>
                          <IonSelectOption value='30'>30</IonSelectOption>
                          <IonSelectOption value='40'>40</IonSelectOption>
                          <IonSelectOption value='50'>50</IonSelectOption>
                        </IonSelect>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </>);
            case 'Ház körüli drainezés':
            return (
              <>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Folyóméter:</IonLabel>
                        <IonInput type="number" value={hkdfolyom} onIonChange={(e) => setHkdfolyom(e.target.value)}/>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </>);
            case 'Térkő alap előkészítés':
            return (
              <>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Négyzetméter:</IonLabel>
                        <IonInput type="number" value={taenegyzetm} onIonChange={(e) => setTaenegyzetm(e.target.value)}/>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </>);
            case 'Törmelék elhordás':
            return (
              <>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Köbméter:</IonLabel>
                        <IonInput type="number" value={tekobm} onIonChange={(e) => setTekobm(e.target.value)}/>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </>);
            case 'Tüköralap':
            return (
              <>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Négyzetméter:</IonLabel>
                        <IonInput type="number" value={tanegyzetm} onIonChange={(e) => setTanegyzetm(e.target.value)}/>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </>);
            case 'Tereprendezés':
            case 'Medence ásás':
            case 'Közműbeásás':
            return (
              <>
                <p>Ehhez a munkakörhöz további egyeztetés szükséges!</p>
              </>);
            default:
            return (
              <>
                Kérem válasszon munkakört!

              </>);
            }
          })()}
        </div>
        <div>
          <IonItem>
            <IonLabel>E-mail cím:</IonLabel>
            <IonInput value={email} onIonChange={(e) => setEmail(e.target.value)}/>
          </IonItem>
          <div>
            <IonLabel>Várható költség: {koltseg} Ft</IonLabel>
          </div>
          <IonLabel>Határidő:</IonLabel>
          <Calendar onChange={onDateChange} value={date} minDate={today}/>
        </div>

        <div align="center"> {(() => {
          switch(selected)
            {
            case 'Sávalap ásás':
            return (
              <IonButton onClick={(e) => {
                db.collection('Requests').add({
                  Folyóméter : folyom,
                  Kanálméret: kanalm,
                  date: date,
                  desc: selected,
                  distance: 0,
                  elfogadva: false,
                  email: email,
                  longDesc: selected+" (Folyóméter: "+folyom+", Kanálméret: "+
                            kanalm+", távolság: "+tav+" km, e-mail: "+email+")"
                })}}>Ajánlat kérése</IonButton>
              );
            case 'Ház körüli drainezés':
            return (
              <IonButton onClick={(e) => {
                db.collection('Requests').add({
                  Folyóméter : folyom,
                  date: date,
                  desc: selected,
                  distance: 0,
                  elfogadva: false,
                  email: email,
                  longDesc: selected+" (Folyóméter: "+folyom+
                            ", távolság: "+tav+" km, e-mail: "+email+")"
                })}}>Ajánlat kérése</IonButton>);
            case 'Térkő alap előkészítés':
            return (
              <IonButton onClick={(e) => {
                db.collection('Requests').add({
                  Négyzetméter: negyzetm,
                  date: date,
                  desc: selected,
                  distance: 0,
                  elfogadva: false,
                  email: email,
                  longDesc: selected+" (Négyzetméter: "+negyzetm+
                            ", távolság: "+tav+" km, e-mail: "+email+")"
                })}}>Ajánlat kérése</IonButton>);
            case 'Törmelék elhordás':
            return (
              <IonButton onClick={(e) => {
                db.collection('Requests').add({
                  Köbméter: kobm,
                  date: date,
                  desc: selected,
                  distance: 0,
                  elfogadva: false,
                  email: email,
                  longDesc: selected+" (Köbméter: "+kobm+
                            ", távolság: "+tav+" km, e-mail: "+email+")"
                })}}>Ajánlat kérése</IonButton>);
            case 'Tüköralap':
            return (
              <IonButton onClick={(e) => {
                db.collection('Requests').add({
                  Négyzetméter: negyzetm,
                  date: date,
                  desc: selected,
                  distance: 0,
                  elfogadva: false,
                  email: email,
                  longDesc: selected+" (Négyzetméter: "+negyzetm+
                            ", távolság: "+tav+" km, e-mail: "+email+")"
                })}}>Ajánlat kérése</IonButton>);
            case 'Tereprendezés':
            case 'Medence ásás':
            case 'Közműbeásás':
            return (
              <>
                <p>Ehhez a munkakörhöz további egyeztetés szükséges!</p>
                <IonButton onClick={(e) => {
                  db.collection('Requests').add({
                    date: date,
                    desc: selected,
                    distance: 0,
                    elfogadva: false,
                    email: email,
                    longDesc: selected+" (Távolság: "+tav+" km, e-mail: "+email+")"
                  })}}>Ajánlat kérése</IonButton>
              </>);
            default:
            return (
              <>

              </>);
            }
          })()}

        </div>
        <br/>
        <br/>
        <br/>
    </IonContent>
  </>
)}

export default Bid;
