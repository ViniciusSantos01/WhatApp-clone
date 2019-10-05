const firebase = require('firebase');

export class Firebase {

    constructor() {

        this._firebaseConfig = {
            // Your web app's Firebase configuration
            apiKey: "AIzaSyAtqnlINFqfjDt3a8WITHubaedB_BYWgyU",
            authDomain: "whatsapp-clone-5a334.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-5a334.firebaseio.com",
            projectId: "whatsapp-clone-5a334",
            storageBucket: "gs://whatsapp-clone-5a334.appspot.com",
            messagingSenderId: "780421562585",
            appId: "1:780421562585:web:30a7714f7ca0c14d"
        };

        this.init();

    }

    initAuth(){

        return new Promise((res, rej) => {

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result => {

                let token = result.credential.accessToken;

                let user = result.user;

                res({user, token});

            }).catch(err => {
                rej(err);
            });

        });

    }

    init(){

        if (!window._initializedFirebase) {

            // Initialize Firebase
            firebase.initializeApp(this._firebaseConfig);

            firebase.firestore();

            window._initializedFirebase = true;

        }    

    }

    static db() {

        return firebase.firestore();

    }

    static hd() {

        return firebase.storage();

    }

}