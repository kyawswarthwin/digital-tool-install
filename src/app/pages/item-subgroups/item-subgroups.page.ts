import { ApiService } from 'src/app/services/api.service';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-item-subgroups',
  templateUrl: './item-subgroups.page.html',
  styleUrls: ['./item-subgroups.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class ItemSubgroupsPage implements OnInit {
  sheetName: any;
  group: any;
  defaultHref: any;
  list: any;
  subgroupKey: any;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private apiServ: ApiService
  ) {}

  async ngOnInit() {
    this.sheetName =
      this.route.snapshot.parent?.parent?.parent?.params['sheetName'];
    this.group = this.route.snapshot.paramMap.get('group');
    this.defaultHref = `/list/${this.sheetName}/item-groups`;

    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    loading.present();

    this.apiServ
      .itemSubgroups(this.sheetName, this.group)
      .subscribe(({ data, meta }) => {
        if (data?.length) {
          this.list = data;
          this.subgroupKey = meta.subgroupKey;
        }

        loading.dismiss();
      });
  }
}
