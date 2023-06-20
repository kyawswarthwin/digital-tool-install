import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ItemDetailsComponent implements OnInit {
  @Input() data: any;

  list: any;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.list = Object.keys(this.data);
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
