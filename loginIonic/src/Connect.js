import React from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuButton,
  IonList,
  IonItem,
  IonBackButton,
  IonButtons
} from '@ionic/react';
import Cookies from 'js-cookie'
const Connect = () => {
  const proba=Cookies.get('log');
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
              <IonTitle>Kapcsolat</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          <p>Admin oldal kodot kódoljaok itt</p>
          </IonContent>
    </>
        )
      } else {
        return(
          <>
          <IonHeader>
            <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/"></IonBackButton>
              {/*<IonMenuButton />*/}
            </IonButtons>
              <IonTitle>Kapcsolat</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          <p>User oldal kodot kódoljaok itt</p>
          </IonContent>
          </>
  )
  }
})()}
</>
);
}
export default Connect;
