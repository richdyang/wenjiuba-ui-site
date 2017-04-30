import {Directive, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, OnInit} from "@angular/core";
import {PeekPanel} from "./peekPanel";
import {UIRouter, StateDeclaration, Transition} from "@uirouter/angular";
import {PeekService} from "../../shared/services/peek";

@Directive({
    selector: '[peekAnchor]'
})
export class PeekAnchor{

    constructor(
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: UIRouter,
        private peekService: PeekService
    ) {
        peekService.preparePeek.subscribe((evt) => {
            console.log(`prepare to open: ${evt.baseState.name} -> ${evt.state}`)
            this.openPeek(evt.state, evt.baseState)
        });
    }

    private openPeek(state:string, baseState: any/*, params, options*/) {
        // this.viewContainer.clear();

        let viewName = state.replace(/\./g, '-')
        if(this.peekService.exists(viewName)) return;

        //noinspection TypeScriptValidateTypes
        let peekPanelComponentFactory = this.componentFactoryResolver.resolveComponentFactory(PeekPanel);
        let peekPanelComponentRef = this.viewContainer.createComponent(peekPanelComponentFactory);

        this.peekService.addPeek(viewName, peekPanelComponentRef);

        // let baseState = this.router.stateService.current.name
        let peekPanel = peekPanelComponentRef.instance
        peekPanel.viewName = viewName
        peekPanel.level = this.peekService.level
        peekPanel.close.subscribe(() => {
            this.peekService.removePeek(viewName)
            console.log(`prepare to close: ${state} -> ${baseState.name}`)
            baseState.options.custom.closepeek = true;
            this.router.stateService.go(baseState.name, baseState.params, baseState.options)
        });

        // this.router.stateService.go(state, params, options)

        return peekPanelComponentRef;
    }
}
