
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
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle

} from '@ionic/react';
import Cookies from 'js-cookie'
const About = () => {
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
                <IonBackButton defaultHref="/" />
              </IonButtons>
              <IonTitle>Rólunk</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          <IonCard>
              <img src="https://as1.ftcdn.net/jpg/02/11/26/98/500_F_211269880_j3hBBnIyUSwg168l6tjAolifK8Z35Bif.jpg" />
              <IonCardHeader>
                <IonCardTitle>KKV helper</IonCardTitle>
                <IonCardSubtitle>Rólunk</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <p>Admin oldal kodot kódoljatok itt</p>
              </IonCardContent>
            </IonCard>

          </IonContent>
        </>
      )
    } else {
      return(
        <>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/" />
              </IonButtons>
              <IonTitle>Rólunk</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          <IonCard>
              <img src="https://as1.ftcdn.net/jpg/02/11/26/98/500_F_211269880_j3hBBnIyUSwg168l6tjAolifK8Z35Bif.jpg" />
              <IonCardHeader>
                <IonCardTitle>KKV helper</IonCardTitle>
                <IonCardSubtitle>Rólunk</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
              <p>User oldal kodot kódoljaok itt</p>
              </IonCardContent>
            </IonCard>

          </IonContent>
        </>
)
}
})()}
</>
);
}

export default About;
