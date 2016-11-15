import {
  AfterContentInit,
  AnimationTransitionEvent,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  QueryList,
  trigger,
  state,
  style,
  transition,
  animate, Directive, HostListener, ContentChild, HostBinding, NgModule
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import {UIView, Transition, StateService} from "ui-router-ng2/ng2";
import {CommonModule} from "@angular/common";

export const SIDEBAR_POSITION = {
  Left: 'left',
  Right: 'right',
  Top: 'top',
  Bottom: 'bottom'
};

@Directive({ selector: '[p-offcanvas-close]' })
export class CloseOffcanvas {
  @Output() clicked: EventEmitter<null> = new EventEmitter<null>();

  @HostListener('click')
  _onClick() {
    this.clicked.emit(null);
  }
}

@Component({
  selector: 'p-offcanvas',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="bb-close" (click)="_manualClose()" class="closer--{{level}}" [ngClass]="closerClass" [class.hide]="hideCloser">×</div>
    <aside #sidebar
      [@visibleSidebarState]="_visibleSidebarState"
      (@visibleSidebarState.start)="_animationStarted($event)"
      (@visibleSidebarState.done)="_animationDone($event)"
      role="complementary"
      [attr.aria-hidden]="!open"
      [attr.aria-label]="ariaLabel"
      class="ng2-sidebar ng2-sidebar--{{position}} sidebar--{{level}}"
      [class.ng2-sidebar--style]="defaultStyles"
      [ngClass]="sidebarClass">
      
      <ng-content></ng-content>
    </aside>
   
    <div *ngIf="showOverlay"
      aria-hidden="true"
      class="ng2-sidebar__overlay overlay--{{level}}"
      [class.ng2-sidebar__overlay--style]="open && defaultStyles"
      [ngClass]="overlayClass"></div>
  `,
  styles: [`

    .ng2-sidebar {
      overflow: auto;
      pointer-events: none;
      position: absolute;
      z-index: 10000;
      padding: 0 40px;
      height: auto;
    }

    .ng2-sidebar--left {
      bottom: 0;
      left: 0;
      top: 0;
    }

    .ng2-sidebar--right {
      bottom: 0;
      right: 0;
      top: 0;
      left: 100px;
    }

    .ng2-sidebar--top {
      left: 0;
      right: 0;
      top: 0;
    }

    .ng2-sidebar--bottom {
      bottom: 0;
      left: 0;
      right: 0;
    }

    .ng2-sidebar--style {
      background: #fff;
      box-shadow: 0 0 2.5em rgba(85, 85, 85, 0.5);
    }

    .ng2-sidebar__overlay {
      height: 100%;
      left: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: 9999;
    }

    .ng2-sidebar__overlay--style {
      background: #000;
      opacity: 0.75;
    }
    
    .bb-close {
        position: absolute;
        background-color: #ca2848 !important;
        color: #FFFFFF !important;
        right: auto;
        left: 84px;
        top: 15px;
        z-index: 10001;
        height: 32px;
        width: 32px;
        line-height: 1.5rem;
        
        font-size: 20px;
        text-align: center;
        padding-top: 6px;
    }
    .bb-close:after {
      position: absolute;
      content: "";
      top: 100%;
      left: 0;
      border: 8px solid transparent;
      border-top-color: #961e0b;
      border-right-color: #961e0b; 
     }
    .bb-close:hover {
      background-color: #ca0b07; 
      color: #FFFFFF; 
      cursor: pointer;
     }
     
     .bb-close.hide {
        transform: rotateY(90deg);
        /*display: none;*/
     }
     
     .overlay--1 {
        z-index: 1000;
     }
     
     .sidebar--1 {
        left: 200px;
        z-index: 1001;
     }
     
     .closer--1 {
        left: 184px;
        z-index: 1002;
     }

     
     .overlay--2 {
        left: 200px;
        z-index: 2000;
     }
     
     .sidebar--2 {
        left: 300px;
        z-index: 2001;
     }
     
     .closer--2 {
        left: 284px;
        z-index: 2002;
     }
     
     .overlay--3 {
        left: 300px;
        z-index: 3000;
     }
     
     .sidebar--3 {
        left: 400px;
        z-index: 3001;
     }
     
     .closer--3 {
        left: 384px;
        z-index: 3002;
     }
     
     
  `],
  animations: [
    trigger('visibleSidebarState', [
      state('expanded', style({ transform: 'none', pointerEvents: 'auto', willChange: 'initial', display: 'auto'})),
      state('expanded--animate', style({ transform: 'none', pointerEvents: 'auto', willChange: 'initial'})),
      state('collapsed--left', style({ transform: 'translateX(-110%)' })),
      state('collapsed--right', style({ transform: 'translateX(110%)', display: 'none' })),
      state('collapsed--top', style({ transform: 'translateY(-110%)' })),
      state('collapsed--bottom', style({ transform: 'translateY(110%)' })),
      transition('expanded--animate <=> *', animate('0.3s cubic-bezier(0, 0, 0.3, 1)'))
    ])
  ]
})
export class Offcanvas implements AfterContentInit, OnChanges, OnDestroy {
  // `openChange` allows for 2-way data binding
  @Input() open: boolean = false;
  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() position: string = SIDEBAR_POSITION.Right;
  @Input() closeOnClickOutside: boolean = false;
  @Input() showOverlay: boolean = true;
  @Input() animate: boolean = true;

  @Input() defaultStyles: boolean = true;

  @Input() sidebarClass: string;
  @Input() overlayClass: string;
  @Input() closerClass: string;

  @Input() level:number = 1
  @Input() hideCloser:boolean = false

  @Input() ariaLabel: string;
  @Input() trapFocus: boolean = true;

  @Output() onOpen: EventEmitter<null> = new EventEmitter<null>();
  @Output() onClose: EventEmitter<null> = new EventEmitter<null>();

  @Output() onAnimationStarted: EventEmitter<AnimationTransitionEvent> =
    new EventEmitter<AnimationTransitionEvent>();
  @Output() onAnimationDone: EventEmitter<AnimationTransitionEvent> =
    new EventEmitter<AnimationTransitionEvent>();

  @ViewChild('sidebar')
  private _elSidebar: ElementRef;

  @ContentChildren(CloseOffcanvas)
  private _closeDirectives: QueryList<CloseOffcanvas>;

  private _visibleSidebarState: string;

  private _onClickOutsideAttached: boolean = false;

  private _focusableElementsString: string = 'a[href], area[href], input:not([disabled]), select:not([disabled]),' +
    'textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';
  private _focusableElements: Array<HTMLElement>;
  private _focusedBeforeOpen: HTMLElement;

  constructor(@Inject(DOCUMENT) private _document /*: HTMLDocument */) {
    this._manualClose = this._manualClose.bind(this);
    this._trapFocus = this._trapFocus.bind(this);
    this._onClickOutside = this._onClickOutside.bind(this);
  }

  ngAfterContentInit() {
    if (this._closeDirectives) {
      this._closeDirectives.forEach((dir: CloseOffcanvas) => {
        dir.clicked.subscribe(this._manualClose);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['open']) {
      if (this.open) {
        this._open();
      } else {
        this._close();
      }

      this._setVisibleSidebarState();
    }

    if (changes['closeOnClickOutside']) {
      this._initCloseOnClickOutside();
    }

    if (changes['position']) {
      this._setVisibleSidebarState();
    }
  }

  ngOnDestroy() {
    this._destroyCloseOnClickOutside();

    if (this._closeDirectives) {
      this._closeDirectives.forEach((dir: CloseOffcanvas) => {
        dir.clicked.unsubscribe();
      });
    }
  }

  private _setVisibleSidebarState() {
    this._visibleSidebarState = this.open ?
      this.animate ? 'expanded--animate' : 'expanded' :
      `collapsed--${this.position}`;
  }

  private _open() {
    this._document.body.classList.add('noscroll')
    this._setFocused(true);

    this._initCloseOnClickOutside();

    this.onOpen.emit(null);
  }

  private _close() {
    if(this.level == 1) {
      this._document.body.classList.remove('noscroll')
    }
    this._setFocused(false);

    this._destroyCloseOnClickOutside();

    this.onClose.emit(null);
  }

  private _manualClose() {
    this.open = false;
    this.openChange.emit(false);

    this._close();
  }


  // Focus on openPeek/close
  // ==============================================================================================

  private _setFocusToFirstItem() {
    if (this._focusableElements && this._focusableElements.length) {
      this._focusableElements[0].focus();
    }
  }

  private _trapFocus(e: FocusEvent) {
    if (this.open && this.trapFocus && !this._elSidebar.nativeElement.contains(e.target)) {
      this._setFocusToFirstItem();
    }
  }

  // Handles the ability to focus sidebar elements when it's openPeek/closed
  private _setFocused(open: boolean) {
    this._focusableElements = Array.from(
      this._elSidebar.nativeElement.querySelectorAll(this._focusableElementsString)) as Array<HTMLElement>;

    if (open) {
      this._focusedBeforeOpen = this._document.activeElement as HTMLElement;

      // Restore focusability, with previous tabindex attributes
      for (let el of this._focusableElements) {
        const prevTabIndex = el.getAttribute('__tabindex__');
        if (prevTabIndex) {
          el.setAttribute('tabindex', prevTabIndex);
          el.removeAttribute('__tabindex__');
        } else {
          el.removeAttribute('tabindex');
        }
      }

      this._setFocusToFirstItem();

      this._document.body.addEventListener('focus', this._trapFocus, true);
    } else {
      // Manually make all focusable elements unfocusable, saving existing tabindex attributes
      for (let el of this._focusableElements) {
        const existingTabIndex = el.getAttribute('tabindex');
        if (existingTabIndex) {
          el.setAttribute('__tabindex__', existingTabIndex);
        }

        el.setAttribute('tabindex', '-1');
      }

      if (this._focusedBeforeOpen) {
        this._focusedBeforeOpen.focus();
      }

      this._document.body.removeEventListener('focus', this._trapFocus, true);
    }
  }


  // On click outside
  // ==============================================================================================

  private _initCloseOnClickOutside() {
    if (this.open && this.closeOnClickOutside && !this._onClickOutsideAttached) {
      // In a timeout so that things render first
      setTimeout(() => {
        this._document.body.addEventListener('click', this._onClickOutside, true);
        this._onClickOutsideAttached = true;
      });
    }
  }

  private _destroyCloseOnClickOutside() {
    if (this._onClickOutsideAttached) {
      this._document.body.removeEventListener('click', this._onClickOutside, true);
      this._onClickOutsideAttached = false;
    }
  }

  private _onClickOutside(e: MouseEvent) {
    if (this._onClickOutsideAttached && this._elSidebar && !this._elSidebar.nativeElement.contains(e.target)) {
      this._manualClose();
    }
  }


  // Animation callbacks
  // ==============================================================================================

  // tslint:disable-next-line:no-unused-variable
  private _animationStarted(e: AnimationTransitionEvent) {
    this.onAnimationStarted.emit(e);
  }

  // tslint:disable-next-line:no-unused-variable
  private _animationDone(e: AnimationTransitionEvent) {
    this.onAnimationDone.emit(e);
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [Offcanvas],
  declarations: [Offcanvas]
})
export class OffcanvasModule { }
