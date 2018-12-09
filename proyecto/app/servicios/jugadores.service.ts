import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, PathReference, QueryFn} from 'angularfire2/database';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class JugadoresService {

    constructor(private db: AngularFireDatabase) {
    }


    listarJugadores() {
        return this.db.list('/jugadores').snapshotChanges().pipe(map(item => {
            return item.map(a => {
                    const key = a.payload.key;
                    const data = a.payload.val();
                    // cons key=a.payload.key;
                    return {key, data};
                }
            );
        }));
    }

    guardarJugador(jugador) {
        // this.jugador = this.saveJugador();
        return this.db.list('jugadores').push(jugador);

    }

    delJugador(jugador) {
        return this.db.list('jugadores').remove(jugador);
    }


    editarJugador(jugador, id) {
        console.log('En el servicio');
        console.log(jugador);
        console.log(id);
    }


}
