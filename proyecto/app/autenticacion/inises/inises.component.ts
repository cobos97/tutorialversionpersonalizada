import {Component, OnInit} from '@angular/core';
import {AutenticacionService} from '../../servicios/autenticacion.service';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-inises',
    templateUrl: './inises.component.html',
    styleUrls: ['./inises.component.scss']
})
export class InisesComponent implements OnInit {

    loginForm: FormGroup;
    userdata: any;
    mensaje = false;
    mensaje2 = false;

    constructor(private formBuilder: FormBuilder,
                private autService: AutenticacionService,
                private router: Router,
                private activatedRouter: ActivatedRoute) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            'email': ['', [
                Validators.required,
                Validators.email
            ]
            ],
            'password': ['', [
                Validators.required,
                Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                Validators.minLength(6)
            ]
            ]
        });
    }

    onSubmit() {
        this.userdata = this.saveUserdata();
        this.autService.inicioSesion(this.userdata)
            .then(response => {
                console.log(response);
                this.router.navigate(['/inicio']);
            })
            .catch(
                error => {
                    this.mensaje = true;
                    console.log(error);
                }
            );
        /* setTimeout(() => {
             if (this.isAuth() === false) {
                 this.mensaje = true;
             }
         }, 2000);*/

    }

    sesionGoogle() {
        console.log('Entra');
        this.autService.inicioSesionGoogle()
            .then( response => {
                console.log(response);
                this.router.navigate(['/inicio']);
            })
            .catch( error => {
                this.mensaje2 = true;
                console.log(error);
            });
    }


    saveUserdata() {

        const saveUserdata = {
            email: this.loginForm.get('email').value,
            password: this.loginForm.get('password').value,
        };
        return saveUserdata;
    }

    isAuth() {
        return this.autService.isAuthenticated();
    }

}
