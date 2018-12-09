import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList, PathReference, QueryFn} from 'angularfire2/database';
import {map} from 'rxjs/operators';
import {any} from 'codelyzer/util/function';
import {JugadoresService} from '../../servicios/jugadores.service';

@Component({
    selector: 'app-jugadores',
    templateUrl: './jugadores.component.html',
    styleUrls: ['./jugadores.component.scss']
})
export class JugadoresComponent implements OnInit {

    jugadores$: any[] = [];
    idJugador: any;

    jugadorId: any;
    jugadorNombre: any;
    jugadorApellido: any;
    jugadorFecha: any;


    /*
    constructor(private db: AngularFireDatabase) {
    }
    */

    constructor(private sj: JugadoresService) {
    }

    ngOnInit() {
        /*
        this.db.list('/jugadores').snapshotChanges().pipe(map(item => {
            return item.map(a => {
                    const data = a.payload.val();
                    // cons key=a.payload.key;
                    return {data};
                }
            );
        })).subscribe(
            jugadores => {
                this.jugadores$ = jugadores;
            }
        );
        */

        this.sj.listarJugadores().subscribe(
            jugadores => {
                this.jugadores$ = jugadores;
            }
        );
    }


    guardarJugador(id, nombre, apellido, fecha) {
        this.jugadorId = id;
        this.jugadorNombre = nombre;
        this.jugadorApellido = apellido;
        this.jugadorFecha = fecha;
    }

    getNombreJugador() {
        return this.jugadorNombre;
    }

    setNombreJugador() {

    }

    getApellidoJugador() {
        return this.jugadorApellido;
    }

    getFechaJugador() {
        return this.jugadorFecha;
    }


    guardarID(id) {
        console.log('Guardando id');
        this.idJugador = id;
    }

    getID() {
        return this.idJugador;
    }

    getJugadorId() {
        return this.jugadorId;
    }

    mostrarID() {
        console.log(this.jugadorId);
    }

    eliminarJugador() {

        this.sj.delJugador(this.idJugador);

        this.sj.listarJugadores().subscribe(
            jugadores => {
                this.jugadores$ = jugadores;
            }
        );

    }

    /*
    saveJugador(id$) {

        const saveJugador = {
            nombre: id$.data.nombre,
            apellidos: id$.data.apellidos,
            fechanac: id$.data.fechanac
        };

        return saveJugador;
    }
*/

}
