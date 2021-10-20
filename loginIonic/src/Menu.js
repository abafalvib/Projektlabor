import React, {useState, useEffect} from 'react';
import { isPlatform } from '@ionic/react';
import { withRouter } from 'react-router-dom';
import {pricetagOutline, informationCircleOutline, logInOutline, logOutOutline, personOutline,
        pencilOutline, calendarOutline, homeOutline} from 'ionicons/icons';
import { IonMenu, IonItem, IonContent, IonMenuToggle,IonIcon } from '@ionic/react';
import { createBrowserHistory } from 'history';
import Cookies from 'js-cookie';
import fire from './fire';
const Menu = ({ history }) => {
  const handleLogout = () => {
    fire.auth().signOut();
  };

  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    //showInstallPromotion();
    // Optionally, send analytics event that PWA install promo was shown.
    console.log(`'beforeinstallprompt' event was fired.`);
  });

  const [installVisible,setInstallVisible]=useState(true);
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

              {(() => {
                if (installVisible==true&&isPlatform('desktop')) {
                  return (
                    <>
                    <IonMenuToggle>
                    <IonItem className="menukont" onClick={async () => {
                      // Hide the app provided install promotion
                      // Show the install prompt
                      deferredPrompt.prompt();
                      // Wait for the user to respond to the prompt
                      const { outcome } = await deferredPrompt.userChoice;
                      // Optionally, send analytics event with outcome of user choice
                      console.log(`User response to the install prompt: ${outcome}`);
                      if (outcome=="accepted"){
                        setInstallVisible(false);
                      }
                      // We've used the prompt, and can't use it again, throw it away
                      deferredPrompt = null;
                    }} class="Clickable"><IonIcon icon={homeOutline} slot="start" />Kezdőképernyőhöz adás</IonItem>
                    </IonMenuToggle>
                    </>

                  )
                }
                else {
                  return(
                    <>
                    </>
                  )
                }
              })()}

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
      {(() => {
        if (installVisible==true&&isPlatform('desktop')) {
          return (
            <>
            <IonMenuToggle>
            <IonItem className="menukont" onClick={async () => {
              // Hide the app provided install promotion
              // Show the install prompt
              deferredPrompt.prompt();
              // Wait for the user to respond to the prompt
              const { outcome } = await deferredPrompt.userChoice;
              // Optionally, send analytics event with outcome of user choice
              console.log(`User response to the install prompt: ${outcome}`);
              // We've used the prompt, and can't use it again, throw it away
              if (outcome=="accepted"){
                setInstallVisible(false);
              }
              deferredPrompt = null;
            }} class="Clickable"><IonIcon icon={homeOutline} slot="start" />Kezdőképernyőhöz adás</IonItem>
            </IonMenuToggle>
            </>

          )
        }
        else {
          return(
            <>
            </>
          )
        }
      })()}
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
