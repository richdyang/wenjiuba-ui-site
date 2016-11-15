import {BaseComponent} from "./components/base";
import {WelcomeComponent} from "./components/welcome";
import {SignupForm} from "./components/signup-form";
import {DashboardComponent} from "./components/dashboard";

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
    name: 'dashboard',
    url:  '/dashboard',
    component: DashboardComponent,
    parent: 'base'
  },
  {
    name: 'signup',
    url:  '/signup',
    component: SignupForm
  },
]
