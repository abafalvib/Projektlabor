import React, {useRef, useState, useEffect, Component} from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButton } from '@ionic/react';
import Home from './pages/Home';
import "./index.css";
import fire from './fire';
import Login from './Login2';
import Hero from './Hero';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

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

  const handleSignup = () => {

    var db = fire.firestore();
    var successful=true;
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .catch((err) => {
        successful=false;
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      }).finally(()=>{
        if (successful)
      {
        db.collection("Users").add({
          Admin : "false",
          Username: email
        })
      }});


  };

  const handleLogout = () => {
    fire.auth().signOut();
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

return (
  <IonApp>
  <div>
  {user ? (
    <Hero handleLogout={handleLogout}/>
  ) : (
    <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword}
    handleLogin={handleLogin} handleSignup={handleSignup} hasAccount={hasAccount}
    setHasAccount={setHasAccount} emailError={emailError} passwordError={passwordError}/>
  )}


   </div>
  </IonApp>
);
};

export default App;
