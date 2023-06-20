import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-item-groups',
  templateUrl: './item-groups.page.html',
  styleUrls: ['./item-groups.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ItemGroupsPage implements OnInit {
  sheet: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sheet = this.route.snapshot.parent?.params['sheet'];
  }
}
