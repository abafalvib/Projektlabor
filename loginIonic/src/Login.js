import React, {useRef, useState, useEffect, Component} from 'react';
import {calendarOutline} from 'ionicons/icons';
import fire from './fire';
import Welcome from './Welcome';
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
  IonButton
} from '@ionic/react';

const Login:React.FC = () => {



  const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState(false);
    const [date, setDate] = useState(new Date());

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
                break;
              case "auth/wrong-password":
                setPasswordError(err.message);
                break;
            }
          });
          if (successful)
          {
            db.collection("Users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

          if(email == doc.get("Username")){

              if(doc.get("Admin") === "true"){
                console.log("Admin");
              }else{
                console.log("User");
              }

          }

        });
      });
          }
    };


  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user){
        clearInputs();
        setUser(user);
      }
      else {
        setUser("");
      }
    });
  };

useEffect(() => {
  authListener();
}, []);




  return(
  <>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/" />
          {/*<IonMenuButton />*/}
        </IonButtons>
        <IonTitle>Bejelentkezés</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
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
    </IonContent>


  <div>
      {(() => {
        if (user) {
          console.log("anyad");
          return (
             /*<Welcome handleLogout={handleLogout}/>*/
             <h1>54345</h1>
          )
        }
      })()}
    </div>
    </>

);
}
export default Login;
