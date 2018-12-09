import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';
import {interval} from 'rxjs';
import {AutenticacionService} from '../../servicios/autenticacion.service';
import {JugadoresService} from '../../servicios/jugadores.service';

@Component({
    selector: 'app-addjug',
    templateUrl: './addjug.component.html',
    styleUrls: ['./addjug.component.scss']
})
export class AddjugComponent implements OnInit {

    jugadoresForm: FormGroup;
    jugador: any;

    enviado: boolean;

    /*
    constructor(private jf: FormBuilder, private db: AngularFireDatabase) {
    }
    */

    constructor(private  jf: FormBuilder, private js: JugadoresService) {
    }

    /*
    constructor(private db: AngularFireDatabase) { }
*/
    ngOnInit() {
        this.jugadoresForm = this.jf.group({
            nombre: ['', Validators.required],
            apellidos: ['', Validators.required],
            fechanac: ['', Validators.required]
        });
    }

    onSubmit() {

        this.js.guardarJugador(this.saveJugador())
            .then(_ => {
                this.jugador = {};
                console.log('success');
            });

        /*
        this.jugador = this.saveJugador();
        this.db.list('jugadores').push(this.jugador)
            .then(_ => {
                this.jugador = {};
                console.log('success');
            });
            */

        this.enviado = true;

        /*
        setTimeout(function () {
            this.enviado = false;
        }, 3000);
*/

        this.jugadoresForm = this.jf.group({
            nombre: ['', Validators.required],
            apellidos: ['', Validators.required],
            fechanac: ['', Validators.required]
        });

    }


    saveJugador() {
        const saveJugador = {
            nombre: this.jugadoresForm.get('nombre').value,
            apellidos: this.jugadoresForm.get('apellidos').value,
            fechanac: this.jugadoresForm.get('fechanac').value
        };
        return saveJugador;
    }

}
