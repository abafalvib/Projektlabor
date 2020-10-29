import React from 'react';
import { withRouter } from 'react-router-dom';
import { IonMenu, IonItem, IonContent, IonMenuToggle,IonIcon } from '@ionic/react';
import { createBrowserHistory } from 'history';
import Cookies from 'js-cookie'
import fire from './fire';
const Menu = ({ history }) => {
  const handleLogout = () => {
    fire.auth().signOut();
  };
    const proba=Cookies.get('log');
  return(

    <>

    {(() => {
      if (proba=='loginTrue') {
        return (
          <>
          <IonMenu contentId="main">
            <IonContent>
            <IonMenuToggle>
              <IonItem onClick={() => history.push('/admin')}  class="Clickable"><IonIcon name="person-outline" slot="start" /><div>Admin</div></IonItem>
            </IonMenuToggle>
              <IonMenuToggle>
                <IonItem onClick={() => history.push('/about')} class="Clickable"><IonIcon name="information-circle-outline" slot="start" />Rólunk</IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem onClick={() => history.push('/connect')}  class="Clickable"><IonIcon name="call-outline" slot="start" /><div>Kapcsolat</div></IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/login" onClick={handleLogout}  class="Clickable"><IonIcon name="log-out-outline" slot="start" /><div>Kijelentkezés</div></IonItem>
              </IonMenuToggle>


            </IonContent>
          </IonMenu>
          </>

        )
      } else {
        return(

    <>
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
  </>
  )
  }
  })()}
  </>
);
}

export default withRouter(Menu);
