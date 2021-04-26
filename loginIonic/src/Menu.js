import React from 'react';
import { withRouter } from 'react-router-dom';
import {pricetagOutline, informationCircleOutline, logInOutline, logOutOutline, personOutline,
        pencilOutline, calendarOutline} from 'ionicons/icons';
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
            <IonContent className="menukontent">
            <IonMenuToggle>
              <IonItem className="menukont" onClick={() => history.push('/pricehandler')}  class="Clickable"><IonIcon icon={personOutline} slot="start" /><div>Árajánlat kezelése</div></IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem className="menukont" onClick={() => history.push('/agendamenu')}  class="Clickable"><IonIcon icon={calendarOutline} slot="start" /><div>Naptár</div></IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem className="menukont" onClick={() => history.push('/pricechange')}  class="Clickable"><IonIcon icon={pencilOutline} slot="start" /><div>Árszerkesztés</div></IonItem>
            </IonMenuToggle>
              <IonMenuToggle>
                <IonItem className="menukont" onClick={() => history.push('/about')} class="Clickable"><IonIcon icon={informationCircleOutline} slot="start" />Rólunk & Kapcsolat</IonItem>
              </IonMenuToggle>

              <IonMenuToggle>
                <IonItem className="menukont" routerLink="/login" onClick={handleLogout}  class="Clickable"><IonIcon icon={logOutOutline} slot="start" /><div>Kijelentkezés</div></IonItem>
              </IonMenuToggle>



            </IonContent>
          </IonMenu>
          </>

        )
      } else {
        return(

    <>
  <IonMenu contentId="main">
    <IonContent className="menukontent">

      <IonMenuToggle>
        <IonItem className="menukont" onClick={() => history.push('/bid')} class="Clickable"><IonIcon icon={pricetagOutline} slot="start" />Árajánlat</IonItem>
      </IonMenuToggle>
      <IonMenuToggle>
        <IonItem className="menukont" onClick={() => history.push('/about')} class="Clickable"><IonIcon icon={informationCircleOutline} slot="start" />Kapcsolat</IonItem>
      </IonMenuToggle>

      <IonMenuToggle>
        <IonItem className="menukont" onClick={() => history.push('/login')}  class="Clickable"><IonIcon icon={logInOutline} slot="start" /><div>Bejelentkezés</div></IonItem>
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
