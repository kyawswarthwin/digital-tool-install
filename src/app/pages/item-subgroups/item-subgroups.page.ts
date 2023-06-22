import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-item-subgroups',
  templateUrl: './item-subgroups.page.html',
  styleUrls: ['./item-subgroups.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ItemSubgroupsPage implements OnInit {
  sheetName: any;
  group: any;
  defaultHref: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sheetName = this.route.snapshot.parent?.params['sheetName'];
    this.group = this.route.snapshot.paramMap.get('group');
    this.defaultHref = `/list/${this.sheetName}/item-groups`;
  }
}
