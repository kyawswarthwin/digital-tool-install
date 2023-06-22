import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-group-items',
  templateUrl: './group-items.page.html',
  styleUrls: ['./group-items.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class GroupItemsPage implements OnInit {
  sheetName: any;
  group: any;
  subgroups: any;
  defaultHref: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sheetName =
      this.route.snapshot.parent?.parent?.parent?.params['sheetName'];
    this.group = this.route.snapshot.paramMap.get('group');
    this.subgroups = this.route.snapshot.paramMap.get('subgroups');
    this.defaultHref = `/list/${this.sheetName}/item-groups/${this.group}`;
  }
}
