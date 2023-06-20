import { ApiService } from 'src/app/services/api.service';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class HomePage implements OnInit {
  list: any;

  constructor(
    private loadingCtrl: LoadingController,

    private apiServ: ApiService
  ) {}

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    loading.present();

    this.apiServ.list().subscribe((data) => {
      if (data.length) {
        this.list = data;
      }

      loading.dismiss();
    });
  }
}
