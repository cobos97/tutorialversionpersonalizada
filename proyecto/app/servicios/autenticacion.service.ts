import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Router, ActivatedRoute} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AutenticacionService {

    constructor(private router: Router,
                private activatedRouter: ActivatedRoute, private afS: AngularFireAuth) {
    }

    /*
    Devuelve un Promise de tipo fire.auth.userCredentials
    */
    registroUsuario(userdata) {
        // return this.afS.auth.createUserWithEmailAndPassword
        return this.afS.auth.createUserWithEmailAndPassword(userdata.email,
            userdata.password);
    }

    inicioSesion(userdata) {
        return this.afS.auth.signInWithEmailAndPassword(userdata.email, userdata.password);
    }


    inicioSesionGoogle() {
        return this.afS.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }


    isAuthenticated() {
        return this.afS.authState;
    }

    isLogged() {
        return this.afS.authState.pipe(map(user => {
                if (user)
                    return true;
                else
                    return false;
            }
        ));
    }

    logout() {
        console.log('en el servicio...');
        return firebase.auth().signOut();

        //return this.afS.auth.signOut();
        //firebase.auth().signOut();
    }


}
