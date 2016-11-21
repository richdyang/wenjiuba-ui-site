import {BaseComponent} from "./components/base";
import {WelcomeComponent} from "./components/welcome";
import {SignupForm} from "./components/signup-form";
import {PaymentComponent, AlipayTrade} from "./components/payment";
import {DashboardComponent} from "../dashboard/components/dashboard";

export const states = [
    {
        name: 'welcome',
        url: '/',
        component: WelcomeComponent
    },
    {
        name: 'base',
        abstract: true,
        component: BaseComponent
    },
    {
        name: 'signup',
        url: '/signup',
        component: SignupForm
    },
    {
        name: 'payment',
        url: '/payment',
        component: PaymentComponent,
        params: {
            alipayTrade: { }
        },
        resolve: PaymentComponent.resolve,
        parent: 'base'
    },
]
