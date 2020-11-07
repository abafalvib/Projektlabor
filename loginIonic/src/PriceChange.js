import React, { useEffect, useState } from 'react';
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
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonTabBar,
  IonTabs,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,IonGrid,IonCol,IonRow,IonSlides,IonSlide,IonInput,IonButton

} from '@ionic/react';
import fire from './fire';
import Login from './Login';
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom';
const PriceChange = ({history}) => {

    const [first, setFirst] = useState(0);
    const [second, setSecond] = useState(0);
    const [third, setThird] = useState(0);
    const [fourth, setFourth] = useState(0);
    const [fifth, setFifth] = useState(0);

    const [firstValue, setFirstValue] = useState("");
    const [secondValue, setSecondValue] = useState("");
    const [thirdValue, setThirdValue] = useState("");
    const [fourthValue, setFourthValue] = useState("");
    const [fifthValue, setFifthValue] = useState("");

    

    useEffect(() => {var db = fire.firestore("");
    var docRef = db.collection("AdminData").doc("e7U5eti6iZbTraUz57vu");
    docRef.get().then(function(doc) {
        if (doc.exists) {
            setFirst(parseInt(doc.get("First")));
            setSecond(parseInt(doc.get("Second")));
            setThird(parseInt(doc.get("Third")));
            setFourth(parseInt(doc.get("Fourth")));
            setFifth(parseInt(doc.get("Fifth")));
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });}, []);

    function resetChages(){
      setFirstValue("");
      setSecondValue("");
      setThirdValue("");
      setFourthValue("");
      setFifthValue("");
    }

    function Submit(){var db = fire.firestore();
      var docRef = db.collection("AdminData").doc("e7U5eti6iZbTraUz57vu");
      var firstFinal = firstValue!="" ?firstValue:first;
      var secondFinal = secondValue!=""?secondValue:second;
      var thirdFinal = thirdValue!=""?thirdValue:third;
      var fourthFinal = fourthValue!=""?fourthValue:fourth;
      var fifthFinal = fifthValue!=""?fifthValue:fifth;
      docRef.set({
      First: firstFinal,
      Second: secondFinal,
      Third: thirdFinal,
      Fourth: fourthFinal,
      Fifth: fifthFinal
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      }).finally(function() {
        window.location.reload(false);
      });

    }

    const proba=Cookies.get('log');
    return(



      <>

      {(() => {
        if (proba=='loginTrue') {
          return (
            <>
            <IonHeader>
              <IonToolbar>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/"></IonBackButton>
                {/*<IonMenuButton />*/}
              </IonButtons>
                <IonTitle>Árszerkesztés</IonTitle>
              </IonToolbar>
            </IonHeader>
      <IonGrid>
           <IonRow>



            <IonCol  className = "fel">
             <div>
             <IonList>
              <IonItem>
                <h1>Jelenlegi árak</h1>
              </IonItem>
               <IonItem>
                 <IonLabel position="floating">Sáv: </IonLabel>
                 <IonInput placeholder={first} value={firstValue} onIonChange={(e) => setFirstValue(e.target.value)}></IonInput>
               </IonItem>
               <IonItem>
                 <IonLabel position="floating">Drain: </IonLabel>
                 <IonInput placeholder={second} value={secondValue} onIonChange={(e) => setSecondValue(e.target.value)}></IonInput>
               </IonItem>
               <IonItem>
                 <IonLabel position="floating">Négyzetméter: </IonLabel>
                 <IonInput placeholder={third} value={thirdValue} onIonChange={(e) => setThirdValue(e.target.value)}></IonInput>
               </IonItem>
               <IonItem>
                 <IonLabel position="floating">Köbméter: </IonLabel>
                 <IonInput placeholder={fourth} value={fourthValue} onIonChange={(e) => setFourthValue(e.target.value)}></IonInput>
               </IonItem>
               <IonItem>
                 <IonLabel position="floating">Tükör:</IonLabel>
                 <IonInput placeholder={fifth} value={fifthValue} onIonChange={(e) => setFifthValue(e.target.value)}></IonInput>
               </IonItem>
               <IonItem>
                 <IonButton onClick={ () => {Submit();}}>Save Changes</IonButton>
              { /*/<IonButton onClick={ () => {resetChages();console.log({firstValue})} }>Reset Changes</IonButton>*/}
               </IonItem>

             </IonList>
             </div></IonCol>
           </IonRow>
      </IonGrid>
      </>
          )
        } else {
          return(
            <>
            <Redirect to={{pathname:"/login"}}/>
            </>
    )
    }
  })()}
  </>
);
}
export default PriceChange;
/**/
