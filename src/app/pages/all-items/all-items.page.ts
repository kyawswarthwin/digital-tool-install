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
  selector: 'app-all-items',
  templateUrl: './all-items.page.html',
  styleUrls: ['./all-items.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AllItemsPage implements OnInit {
  sheetName: any;
  list: any;
  titleKey: any;
  subtitleKey: any;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private apiServ: ApiService
  ) {}

  ngOnInit() {
    this.sheetName = this.route.snapshot.parent?.params['sheetName'];
  }

  async search(value: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    loading.present();

    this.apiServ.filter(this.sheetName, value).subscribe((data) => {
      this.list = data;
      const keys = Object.keys(data[0]);
      this.titleKey = this.findAttributeContain(keys, 'Title') || keys[0];
      this.subtitleKey = this.findAttributeContain(
        Object.keys(data[0]),
        'Subtitle'
      );

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

  findAttributeContain(keys: string[], attribute: string) {
    return keys.find((key) =>
      key
        .split(':')
        .slice(1)
        .find((value) => value.toLowerCase() === attribute.toLowerCase())
    );
  }
}
