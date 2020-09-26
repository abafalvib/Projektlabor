import React from 'react';
import { withRouter } from 'react-router-dom';
import { IonMenu, IonItem, IonContent, IonMenuToggle,IonIcon } from '@ionic/react';
import { createBrowserHistory } from 'history';

const Menu = ({ history }) => (
  <IonMenu contentId="main">
    <IonContent>
      <IonMenuToggle>
        <IonItem onClick={() => history.push('/')}><IonIcon name="home-outline" slot="start" />Home</IonItem>
      </IonMenuToggle>
      <IonMenuToggle>
        <IonItem onClick={() => history.push('/about')}><IonIcon name="information-circle-outline" slot="start" />About</IonItem>
      </IonMenuToggle>
      <IonMenuToggle>
        <IonItem onClick={() => history.push('/bid')}><IonIcon name="pricetag-outline" slot="start" />Bid</IonItem>
      </IonMenuToggle>
    </IonContent>
  </IonMenu>
);

export default withRouter(Menu);
