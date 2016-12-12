
import {Injectable} from "@angular/core";

//常用的常数字典
@Injectable()
export class DictService {

    private optionsCache:{[id: string]:DictEntry[]} = {}

    private map:{[id: string]:{[id: string]:string}} = {
        yesno: {
            'Y': '是',
            'N': '否'
        },
        genders: {
            'M': '男',
            'F': '女'
        },
        menses: {
            'P': '未行经',
            'M': '行经',
            'A': '闭经'
        },
        "enoter.requestPackages": {
            'R': '机器人判读',
            'E': '专家判读',
        },
        "enoter.reviews": {
            'P': '未开始',
            'I': '进行中',
            'F': '已完成'
        },
        "enoter.payments": {
            'Y': '已付款',
            'N': '未付款',
            'E': '异常'
        },
        "product.types": {
            'ENOTER': 'e络通',
            'MOXI': '艾灸',
            'MISC': '其它'
        }
    }

    public options(dictKey:string):DictEntry[] {
        let dict = this.map[dictKey];
        if(this.optionsCache[dictKey]) return this.optionsCache[dictKey];

        let options:DictEntry[] = [];
        for(let prop in dict) {
            options.push({
                label: dict[prop],
                value: prop
            })
        }
        this.optionsCache[dictKey] = options;
        return options;
    }

    public display(dictKey, value):string {
        return this.map[dictKey][value];
    }
}

interface DictEntry {
    label:string,
    value:string
}
