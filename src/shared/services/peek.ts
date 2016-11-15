import {Injectable, ComponentRef} from "@angular/core";
import {TransitionHookFn, StateDeclaration, Transition, UIRouter} from "ui-router-ng2/ng2";
import {Subject} from "rxjs/Rx";
import {PeekPanel} from "../../app/components/peekpanel";


@Injectable()
export class PeekService {

    constructor(private router: UIRouter) {
      this.router.transitionService.onSuccess({/*from: (state) => state.name != '', */to: (state) => state['peek']}, (transition:Transition) => {
        let fromState:StateDeclaration = transition.from()
        let toState:StateDeclaration = transition.to()

        let baseState;

        // if(fromState.name == '') { // open directly from browser address bar
          let options = transition.options()
          options.location = true
          options.source = 'sref'
          let params = transition.params('to')

          let stack = []
          let state = transition.$to()
          while(state.name !== '') {
            if(state['peek']) {
              baseState = {
                name: state.parent.name,
                params: params,
                options: options
              }
              stack.push({state: state.name, baseState: baseState})
            }
            state = state.parent
          }

          let views = stack.map(item => item.state.replace(/\./g, '-'))
          let toRemoves = []
          for(let view in this.activePeeks) {
              if(!views.includes(view)) {
                  toRemoves.push(view)
              }
          }
          for(let toRemove of toRemoves) {
              this.removePeek(toRemove);
          }

          for(let item of stack) {
            this.preparePeek.next({
              state: item.state,
              baseState: item.baseState
            });
          }

          return;
        // }
        // if(transition.options().custom.closepeek === true) {
        //   delete transition.options().custom.closepeek
        //   let options = transition.options()
        //   options.location = true
        //   options.source = 'sref'
        //   baseState = {
        //     name: transition.$to().parent.name,
        //     params: transition.params('to'),
        //     options: options
        //   }
        // } else {
        //   baseState = {
        //     name: fromState.name,
        //     params: transition.params('from'),
        //     options: transition.options()
        //   }
        // }
        //
        // console.log('openPeek peek from sref link')
        // this.preparePeek.next({
        //   state: toState.name,
        //   baseState: baseState
        // });
      })

    }

    preparePeek: Subject<any> = new Subject()

    activePeeks: { [id: string] : ComponentRef<PeekPanel> } = {}

    get level():number {
        return Object.keys(this.activePeeks).length;
    }

    addPeek(viewName, peekPanelComponentRef:ComponentRef<PeekPanel>) {
        this.activePeeks[viewName] = peekPanelComponentRef
    }

    removePeek(viewName) {
        this.activePeeks[viewName].destroy();
        delete this.activePeeks[viewName];
    }

    exists(viewName):boolean {
        return this.activePeeks.hasOwnProperty(viewName) && this.activePeeks[viewName] != null
    }

    isTop(level) {
        return level == this.level
    }
}
