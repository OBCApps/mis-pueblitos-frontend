import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private loginService : LoginService
  ) { }

  ngOnInit() {
    
    this.getServiceDev()
  }

  getServiceDev() {
    this.loginService.getUsers().subscribe(
      response => {

        console.log("response", response);

      }, err => {
        //this.error_function("Error de Logeo")
      }
    )
  }
  /* 

  get2(){
    http.get<config>().subscribe (config => {

    })
  } */

  

}
