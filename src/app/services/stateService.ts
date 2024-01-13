import { Injectable } from "@angular/core";
import { ActionsEnum } from "../models/EnumActions";
import { StateModel } from "../models/UserModel";

@Injectable({
    providedIn: "root",
})
export class stateService1 {

    private data: StateModel[];

    constructor() {
        this.data = [];
    }

    setData(obj: StateModel): void {

        if (obj.action == ActionsEnum.INSERT) {
            obj.key = this.generateUuid();
            this.data = [...this.data, obj];
            return;
        }

        const element = this.data.find(f => f.key == obj.key);
        this.data = [...this.data, obj];

        localStorage.setItem('data', JSON.stringify(this.data));
    }

    getData({ key }: StateModel): StateModel {
        const element = this.data.find(f => f.key == key);

        if (element)
            return element;

        return new StateModel();
    }

    deleteData({ key }: StateModel): void {
        this.data = this.data.filter(f => f.key !== key);

        localStorage.setItem('data', JSON.stringify(this.data));
    }


    private generateUuid(): string {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                var r = (Math.random() * 16) | 0,
                    v = c == "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }
        );
    }
}
