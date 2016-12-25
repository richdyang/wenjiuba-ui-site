import {BaseComponent} from "./components/base";
import {WelcomeComponent} from "./components/welcome";
import {SignupForm} from "./components/signup-form";

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
    }
]
