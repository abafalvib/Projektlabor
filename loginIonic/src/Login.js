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
  IonButtons
} from '@ionic/react';

const Login = () => {



  App.tsx
  fuggveny{
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

    const onDateChange = date => {
      setDate(date);
    };
  };






  return
  (
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

    </IonContent>
  </>

);}
export default Login;
