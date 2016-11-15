
import {Pipe, PipeTransform, NgModule} from "@angular/core";

@Pipe({name: 'excerpt'})
export class ExcerptPipe implements PipeTransform {
    transform(html:string, maxLength:number=50): string {
        let charArr   = html.split(''),
            resultArr = [],
            htmlZone  = 0,
            quoteZone = 0;
        for( let x=0; x < charArr.length; x++ ){
            switch( charArr[x] + htmlZone + quoteZone ){
                case "<00" : htmlZone  = 1;break;
                case ">10" : htmlZone  = 0;resultArr.push(' ');break;
                case '"10' : quoteZone = 1;break;
                case "'10" : quoteZone = 2;break;
                case '"11' :
                case "'12" : quoteZone = 0;break;
                default    : if(!htmlZone){ resultArr.push(charArr[x]); }
            }
        }
        let result:string = resultArr.join('');
        return result.length <= maxLength ? result : `${result.substring(0, maxLength)}...`
    }
}

@NgModule({
  imports: [],
  exports: [ExcerptPipe],
  declarations: [ExcerptPipe]
})
export class ExcerptPipeModule { }
