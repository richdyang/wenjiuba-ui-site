
import {Injectable} from "@angular/core";

//常用的常数字典
@Injectable()
export class DictService {

  yesno = [
    {label: '是', value: 'Y'},
    {label: '否', value: 'N'}
  ];

  genders = [
    {label: '男', value: 'M'},
    {label: '女', value: 'F'}
  ];
}
