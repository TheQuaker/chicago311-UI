import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'chicago311-UI';
  public name: string = null;
  public action: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  userNameClick() {
    if (this.name === 'login') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/home/dashboard']);
    }
  }

  userAction() {
    if (this.action === 'logout') {
      this.authService.logout();
      this.name = null;
      // console.log('name = ' + this.name);
      this.action = null;
      this.router.navigate(['/login']);
    }
  }

  userName(): string {
    let name = 'log in';
    if (this.authService.isLoggedIn()) {
      name = localStorage.getItem('user_name');
      this.action = 'logout';
    }

    return name;
  }

}
