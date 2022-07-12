import { Component, OnInit } from '@angular/core';
import {BaseService} from "@app/shared/base.service";

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  constructor(public baseService: BaseService) { }

  ngOnInit(): void {
  }

}
