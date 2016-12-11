import {Component} from '@angular/core';
import {ApiService} from "../../shared/services/api";

@Component({
    selector: 'enoter',
    template: `
      <div class="col-sm-12">
        <div class="panel">
            <div class="panel-body" >
              <h2>经络辩证</h2>
              <p>经络辨证是以经络及其所联系脏腑的生理病理为基础，辨析经络及其相关脏腑在病理情况下的临床表现，从而辨清病证的所在部位、病因病机及其性质特征等，为治疗提供依据。经络辨证是以经络学说为理论依据对病人的若干症状体征进行分析综合以判断病属何经、何脏、何腑从而进一步确定发病原因病变性质、病理机转的一种辨证方法是中医诊断学的重要组成部分</p>
              <p>本产品通过科学的经络检测仪读取人体十二经络数据, 通过一整套科学的算法进行统计机器学习, 最后结合中医专家的经验辩证, 给您的身体情况产生完整的评估报告。</p>
     
              <h3>如何进行?</h3>
              <div class="text-center">
                <img src="/images/enoter-how.png" style="max-width: 90%">
              </div>
             
              <div style="border: dashed 2px #cccccc; padding: 10px">
                <h4 class="text-muted text-center">不妨试一试吧?</h4>
                <p class="text-muted text-center">
                  您可以选择不同套餐: 机器人判读或者专家辩证噢 -:)
                </p>
                <div class="text-center">
                  <a class="btn btn-danger btn-lg" uiSref="enoter.reports.new">开始一个判读</a>
                </div>
        
              </div>
            </div>
        </div>
      </div>
    `,
    providers: []
})
export class EnoterComponent {
    static resolve = [
        {
            token: 'shop',
            deps: [ApiService],
            resolveFn: (api) => api.get('/shops/default')
        }
    ]
}
