import { DetailsComponent } from 'src/app/components/details/details.component';
import { ApiService } from 'src/app/services/api.service';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  IonicModule,
  LoadingController,
  ModalController,
} from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ListPage implements OnInit {
  sheet: any;
  list: any;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private apiServ: ApiService
  ) {}

  ngOnInit() {
    this.sheet = this.route.snapshot.paramMap.get('sheet');
  }

  async search(value: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    loading.present();

    this.apiServ.filter(this.sheet, value).subscribe((data) => {
      this.list = data;

      loading.dismiss();
    });
  }

  clear() {
    this.list = [];
  }

  async openDetails(data: any) {
    const modal = await this.modalCtrl.create({
      component: DetailsComponent,
      componentProps: {
        data,
      },
    });

    await modal.present();
  }
}
