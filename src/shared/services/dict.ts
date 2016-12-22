
import {Injectable} from "@angular/core";

//常用的常数字典
@Injectable()
export class DictService {

    private optionsCache:{[id: string]:DictEntry[]} = {}

    private map:{[id: string]:{[id: string]:string}} = {
        yesno: {
            'YES': '是',
            'NO': '否'
        },
        genders: {
            'MALE': '男',
            'FEMALE': '女'
        },
        menses: {
            'IMMATURE': '未行经',
            'MENSES': '行经',
            'CEASE': '闭经'
        },
        "enoterReport.requestPackageInd": {
            'ROBOT': '机器人判读',
            'EXPERT': '专家判读',
        },
        "enoterReport.reviewInd": {
            'PENDING': '未开始',
            'INPROGRESS': '进行中',
            'FINISHED': '已完成'
        },
        "enoterReport.paymentInd": {
            'PAID': '已付款',
            'UNPAID': '未付款',
            'EXCEPTION': '异常'
        },
        "product.productType": {
            'ENOTER': 'e络通',
            'MOXIBUSTION': '艾灸',
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
        if(!this.map.hasOwnProperty(dictKey)) {
            console.warn(`dict has not property ${dictKey}`)
            return null;
        }
        return this.map[dictKey][value];
    }
}

interface DictEntry {
    label:string,
    value:string
}
