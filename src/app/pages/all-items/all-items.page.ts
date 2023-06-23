import { ItemDetailsComponent } from 'src/app/components/item-details/item-details.component';
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
  group: any;
  subgroup: any;
  defaultHref: any;
  title: any;
  list: any;
  meta: any;
  titleKey: any;
  descriptionKey: any;

  constructor(
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private apiServ: ApiService
  ) {}

  ngOnInit() {
    this.sheetName =
      this.route.snapshot.parent?.params['sheetName'] ||
      this.route.snapshot.parent?.parent?.parent?.params['sheetName'];
    this.group = this.route.snapshot.paramMap.get('group');
    this.subgroup = this.route.snapshot.paramMap.get('subgroup');
    if (this.group) {
      this.defaultHref = `/list/${this.sheetName}/item-groups/${this.group}`;
      this.title = `${this.group} > ${this.subgroup}`;
    } else {
      this.defaultHref = '/home';
      this.title = this.sheetName;
    }
  }

  async search(value: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    loading.present();

    this.apiServ
      .allItems(this.sheetName, {
        group: this.group,
        subgroup: this.subgroup,
        filter: value,
      })
      .subscribe(({ data, meta }) => {
        if (data?.length) {
          this.list = data;
          this.meta = meta;
          this.titleKey =
            this.filterPropertyContains(meta, 'displayType', 'title').shift() ||
            Object.keys(data[0])[0];
          this.descriptionKey = this.filterPropertyContains(
            meta,
            'displayType',
            'description'
          ).shift();
        }

        loading.dismiss();
      });
  }

  clear() {
    this.list = [];
  }

  async openDetails(data: any, meta: any) {
    const modal = await this.modalCtrl.create({
      component: ItemDetailsComponent,
      componentProps: {
        data,
        meta,
      },
    });

    await modal.present();
  }

  filterPropertyContains(
    object: any,
    property: string,
    filter: string
  ): string[] {
    return Object.entries<any>(object)
      .filter(([key, value]) => new RegExp(filter, 'i').test(value[property]))
      .reduce<any>((accumulator, [key, value]) => accumulator.concat(key), []);
  }
}
