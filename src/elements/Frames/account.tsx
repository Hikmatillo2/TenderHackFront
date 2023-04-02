import {makeAutoObservable} from "mobx";
import {FC} from "react";

class DynamicDiv {
    list: FC[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addCategory(val: FC) {
        this.list.push(val);
    };
}

