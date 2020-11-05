import React, {useRef, useState, useEffect, Component} from 'react';
import {calendarOutline} from 'ionicons/icons';
import fire from './fire';
/*import Welcome from './Welcome';*/
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom';
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
  IonIcon,
  IonInput,
  IonLabel,
  IonButton,
  IonApp
} from '@ionic/react';

const Login:React.FC = () => {



  const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const clearInputs = () => {
      setEmail('');
      setPassword('');
    }

    const clearErrors = () => {
      setEmailError('');
      setPasswordError('');
    }

    const handleLogin = () => {
      var db = fire.firestore();
      var successful=true;
        clearErrors();
        fire
          .auth()
          .signInWithEmailAndPassword(email,password)
          .catch((err) => {
            switch(err.code){
              case "auth/invalid-email":
              case "auth/user-disabled":
              case "auth/user-not-found":
                setEmailError(err.message);
                 successful=false;
                break;
              case "auth/wrong-password":
                setPasswordError(err.message);
                 successful=false;
                break;
            }
          })

      };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user){
        clearInputs();
        setUser(user);
        Cookies.set("log","loginTrue");
      }
      else {
        setUser("");
        Cookies.set("log","loginFalse");
      }
    });
  };

useEffect(() => {
  authListener();
}, []);




  return(
  <>


    <IonContent>
        {(() => {
          if (user) {
            return (
              <>
              <Redirect to={{pathname:"/agendamenu"}}/>
              </>
            )
          } else {
            return(
              <>
            <IonHeader >
              <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton defaultHref="/"></IonBackButton>
                  {/*<IonMenuButton />*/}
                </IonButtons>
                <IonTitle>Bejelentkezés</IonTitle>
              </IonToolbar>
            </IonHeader>

            <div className="wrapper">

            <div className="form-wrapper">
            <IonHeader>
            <IonToolbar color="primary">
            <IonIcon slot="end" size="large" icon={calendarOutline}/>
            <IonTitle>Admin</IonTitle>
            </IonToolbar>
            </IonHeader>

            <IonItem>
            <IonLabel position="floating">User Name</IonLabel>
            <IonInput type="text" autoFocus required id="name"
            value={email} onIonChange={(e)=> setEmail(e.target.value)}></IonInput>
            </IonItem>
            <p className="errorMsg">{emailError}</p>

            <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" name="password"
            required value={password} noValidate id="pw" onIonChange={(e)=> setPassword(e.target.value)}></IonInput>
            </IonItem>
            <p className="errorMsg">{passwordError}</p>
            <IonButton onClick={handleLogin}>Login</IonButton>

            </div>
            </div>
            </>
          )
          }
        })()}
      </IonContent>
    </>
);
}
export default Login;
