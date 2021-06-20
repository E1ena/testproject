import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-authorized-zone',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss']
})
export class AuthorizedZoneComponent implements OnInit {
  public isSolutionMenuOpen: boolean;

  constructor() {
    this.isSolutionMenuOpen = true;
  }

  public ngOnInit(): void {
  }

  public openMenuSolution(): void {
    this.isSolutionMenuOpen = !this.isSolutionMenuOpen;
  }

  public logOut(): void {
  }
}
