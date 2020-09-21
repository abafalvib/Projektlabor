import React from 'react';
import { IonApp, IonButton, IonInput,
          IonLabel, IonItem, IonTitle, IonHeader,
        IonToolbar, IonIcon} from '@ionic/react';
import {calendarOutline} from 'ionicons/icons';

const Login = (props) => {
  const {email,setEmail,password,setPassword, handleLogin, handleSignup,
  hasAccount, setHasAccount, emailError,passwordError}=props;
  return (
    <div className="wrapper">
    <div className="form-wrapper">
    <IonHeader>
    <IonToolbar color="primary">
    <IonIcon slot="end" size="large" icon={calendarOutline}/>
    <IonTitle>Projekt Labor</IonTitle>
    </IonToolbar>
    </IonHeader>
    <IonItem>
    <IonLabel position="floating">User Name</IonLabel>
    <IonInput type="text"  autoFocus required id="name"
    value={email} onIonChange={(e)=> setEmail(e.target.value)}></IonInput>
    </IonItem>
    <p className="errorMsg">{emailError}</p>



    <IonItem>
    <IonLabel position="floating">Password</IonLabel>
    <IonInput type="password" name="password"
    required value={password} noValidate id="pw" onIonChange={(e)=> setPassword(e.target.value)}></IonInput>
    </IonItem>
    <p className="errorMsg">{passwordError}</p>

    <div className="createAccount">
    {hasAccount ? (
      <>
      <IonButton onClick={handleLogin}>Login</IonButton>
      <small> Don't Have an Account?</small><span onClick={()=> setHasAccount(!hasAccount)}>Sign Up</span>
      </>
    ):(
      <>
      <IonButton  id="lgn" onClick={handleSignup}>Sign Up</IonButton>

      <small>Already Have an Account?</small><span onClick={()=> setHasAccount(!hasAccount)}>Login</span>
      </>
    )}
    </div>

    </div>
    </div>
  )
}

export default Login;
