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
} from '@ionic/react';

export const Bid: React.FC = () => {
  const [ selected, setSelected ] = useState('');
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
            <IonRadio slot="start" value="1" />
          </IonItem>
          <IonItem>
            <IonLabel>Ház körüli drainezés</IonLabel>
            <IonRadio slot="start" value="2" />
          </IonItem>
          <IonItem>
            <IonLabel>Térkő alap előkészítés</IonLabel>
            <IonRadio slot="start" value="3" />
          </IonItem>
          <IonItem>
            <IonLabel>Törmelék elhordás</IonLabel>
            <IonRadio slot="start" value="4" />
          </IonItem>
          <IonItem>
            <IonLabel>Tüköralap</IonLabel>
            <IonRadio slot="start" value="5" />
          </IonItem>
          <IonItem>
            <IonLabel>Tereprendezés</IonLabel>
            <IonRadio slot="start" value="6" />
          </IonItem>
          <IonItem>
            <IonLabel>Medence ásás</IonLabel>
            <IonRadio slot="start" value="7" />
          </IonItem>
          <IonItem>
            <IonLabel>Közműbeásás</IonLabel>
            <IonRadio slot="start" value="8" />
          </IonItem>

          </IonRadioGroup>

        </IonList>

        <IonButton>Ajánlat kérése</IonButton>

    </IonContent>
  </>
)}

export default Bid;
