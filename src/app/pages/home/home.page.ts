import { DetailsComponent } from 'src/app/components/details/details.component';
import { ApiService } from 'src/app/services/api.service';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {
  list: any;

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private apiServ: ApiService
  ) {}

  async search(value: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    loading.present();

    this.apiServ.filter(value).subscribe((data) => {
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
