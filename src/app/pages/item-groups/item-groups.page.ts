import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-item-groups',
  templateUrl: './item-groups.page.html',
  styleUrls: ['./item-groups.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ItemGroupsPage {
  constructor() {}
}
