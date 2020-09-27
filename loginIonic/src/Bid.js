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
  IonInput
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

  const onDateChange = date => {
    setDate(date);
  };

/*  const submitRequest = (folyom,kanalm,kobm,negyzetm,
                        datum,desc,em) => {
    var db = fire.firestore();
    db.collection("Requests").add({
      Folyóméter : {folyom},
      Kanálméret: {kanalm},
      Köbméter: {kobm},
      Négyzetméter: {negyzetm},
      date: {datum},
      desc: {desc},
      distance: 0,
      email: {em}
    })
  };*/

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
                        <IonInput value={safolyom} onIonChange={(e) => setSafolyom(e.target.value)}/>
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel>Kanálméret:</IonLabel>
                        <IonInput value={sakanalm} onIonChange={(e) => setSakanalm(e.target.value)}/>
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
                        <IonInput value={hkdfolyom} onIonChange={(e) => setHkdfolyom(e.target.value)}/>
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
                        <IonInput value={taenegyzetm} onIonChange={(e) => setTaenegyzetm(e.target.value)}/>
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
                        <IonInput value={tekobm} onIonChange={(e) => setTekobm(e.target.value)}/>
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
                        <IonInput value={tanegyzetm} onIonChange={(e) => setTanegyzetm(e.target.value)}/>
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
          <IonLabel>Határidő:</IonLabel>
          <Calendar onChange={onDateChange} value={date} minDate={today}/>
        </div>

        <div align="center">
            <IonButton /*onClick={(e) =>{var db = fire.firestore();
            db.collection("Requests").add({
              Folyóméter : {safolyom},
              Kanálméret: {sakanalm},
              Köbméter: {tekobm},
              Négyzetméter: {tanegyzetm},
              date: {date},
              desc: {selected},
              distance: 0,
              email: {email}
            )}}*/>Ajánlat kérése</IonButton>
        </div>
        <br/>
        <br/>
        <br/>
    </IonContent>
  </>
)}

export default Bid;
