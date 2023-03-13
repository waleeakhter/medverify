import { Component, HostListener, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  scrolled: boolean = false;
  @Input() inputSideNav: any;

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 80;
  }
}
