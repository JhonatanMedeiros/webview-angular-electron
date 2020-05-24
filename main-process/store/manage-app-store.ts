import { v4 as uuid } from 'uuid';
import { ipcMain } from 'electron';
import * as Store from 'electron-store';
import { __STORE_KEY__, __STORE_KEY_CREATE__, __STORE_KEY_DELETE__, __STORE_KEY_LIST__, __STORE_KEY_UPDATE__ } from './keys';

export class ManageAppStore {

  private dataList: any[] = [];
  private store = new Store();

  constructor() {
    this.clearDB();
    this.initDB();
  }

  list(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        this.dataList = this.store.get(__STORE_KEY__, []);
        return resolve(this.dataList);
      } catch (e) {
        return reject([]);
      }
    });
  }

  create(data: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        data = { ...data, id: uuid() };
        this.dataList = [...this.dataList, data];
        this.store.set(__STORE_KEY__, this.dataList);
        return resolve(data);
      } catch (e) {
        return reject({ status: 500, message: 'Save error' });
      }
    });
  }

  update(data: any): Promise<any> {
    console.log(data);
    return new Promise((resolve, reject) => {
      return this.foundManageAPP(data.id)
        .then((result) => {
          const foundData = result.data;
          const newData = Object.assign({}, foundData, data);
          console.log('[newData]', newData);
          this.dataList[result.index] = newData;
          this.store.set(__STORE_KEY__, this.dataList);
          console.log('[dataList]', this.dataList);
          return resolve(newData);
        })
        .catch(reject);
    });
  }

  delete(id: string): Promise<boolean> {
    console.log(id);
    return new Promise((resolve, reject) => {
      return this.foundManageAPP(id)
        .then(( { index }) => {
          this.dataList = this.dataList.filter(item => item.id !== id);
          console.log('[dataList]', this.dataList);
          this.store.set(__STORE_KEY__, this.dataList);
          return resolve(true);
        })
        .catch(reject);
    });
  }

  private foundManageAPP(id: string): Promise<{ data: any, index: number }> {
    return new Promise<any>((resolve, reject) => {
      const index = this.dataList.findIndex(i => i.id === id);

      if (index < -1) {
        return reject({ status: 404, message: 'Not found' });
      }

      return resolve({
        data: this.dataList[index],
        index
      });
    });
  }

  private initDB(): void {
    this.list()
      .then(() => console.log(`[DB:${__STORE_KEY__}] Success`))
      .catch(() => console.log(`[DB:${__STORE_KEY__}] Failed`));

    this.listenEvents();
  }

  private listenEvents(): void {
    ipcMain.handle(__STORE_KEY_LIST__, async (event, data: any) => this.list());
    ipcMain.handle(__STORE_KEY_CREATE__, async (event, data: any) => this.create(data));
    ipcMain.handle(__STORE_KEY_UPDATE__, async (event, data: any) => this.update(data));
    ipcMain.handle(__STORE_KEY_DELETE__, async (event, data: any) => this.delete(data));
  }

  private clearDB(): void {
    this.store.delete(__STORE_KEY__);
  }
}
