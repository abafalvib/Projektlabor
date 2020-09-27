import React from 'react';
import { withRouter } from 'react-router-dom';
import { IonMenu, IonItem, IonContent, IonMenuToggle,IonIcon } from '@ionic/react';
import { createBrowserHistory } from 'history';

const Menu = ({ history }) => (
  <IonMenu contentId="main">
    <IonContent>

      <IonMenuToggle>
        <IonItem onClick={() => history.push('/bid')} class="Clickable"><IonIcon name="pricetag-outline" slot="start" />Árajánlat</IonItem>
      </IonMenuToggle>
      <IonMenuToggle>
        <IonItem onClick={() => history.push('/about')} class="Clickable"><IonIcon name="information-circle-outline" slot="start" />Rólunk</IonItem>
      </IonMenuToggle>
      <IonMenuToggle>
        <IonItem onClick={() => history.push('/connect')}  class="Clickable"><IonIcon name="call-outline" slot="start" /><div>Kapcsolat</div></IonItem>
      </IonMenuToggle>
      <IonMenuToggle>
        <IonItem onClick={() => history.push('/login')}  class="Clickable"><IonIcon name="log-in-outline" slot="start" /><div>Bejelentkezés</div></IonItem>
      </IonMenuToggle>

    </IonContent>
  </IonMenu>
);

export default withRouter(Menu);
