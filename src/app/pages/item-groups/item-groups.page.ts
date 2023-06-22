import { ApiService } from 'src/app/services/api.service';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-item-groups',
  templateUrl: './item-groups.page.html',
  styleUrls: ['./item-groups.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class ItemGroupsPage implements OnInit {
  sheetName: any;
  list: any;
  groupKey: any;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private apiServ: ApiService
  ) {}

  async ngOnInit() {
    this.sheetName = this.route.snapshot.parent?.parent?.params['sheetName'];

    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    loading.present();

    this.apiServ.itemGroups(this.sheetName).subscribe(({ data, meta }) => {
      if (data?.length) {
        this.list = data;
        this.groupKey = meta.groupKey;
      }

      loading.dismiss();
    });
  }
}
