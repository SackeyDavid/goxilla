import { Component, OnInit } from '@angular/core';
import {YachtOwnerService} from "@app/index/yacht-owner/yacht-owner.service";

@Component({
  selector: 'app-yacht-owner',
  templateUrl: './yacht-owner.component.html',
  styleUrls: ['./yacht-owner.component.css']
})
export class YachtOwnerComponent implements OnInit {

  constructor(public service: YachtOwnerService) { }

  ngOnInit(): void {
  }

}
