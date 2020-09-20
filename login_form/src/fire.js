import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCnz87kpsjHmIbKzaAKmAv4uM_iIOTLfr8",
  authDomain: "projektlabor-92030.firebaseapp.com",
  databaseURL: "https://projektlabor-92030.firebaseio.com/",
  projectId: "projektlabor-92030",
  storageBucket: "projektlabor-92030.appspot.com",
  messagingSenderId: "549028207260",
  appId: "1:549028207260:web:3166da218ee430031a6b59"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);


export default fire;
