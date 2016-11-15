import {ShopNewComponent} from "./components/shop/shop-new";
import {ShopOutlineComponent} from "./components/shop/shop-outline";
import {StoreListComponent} from "./components/shop/store-list";
import {StoreFormComponent} from "./components/shop/store-form";
import {EmployeeFormComponent} from "./components/shop/employee-form";
import {EmployeeListComponent} from "./components/shop/employee-list";
import {AdminComponent} from "./components/admin";

export const states:any[] = [
    {
        name: 'admin',
        url:  '/admin',
        component: AdminComponent,
        resolve: AdminComponent.resolve,
        parent: 'base'
    },
    {
        name: 'shop-outline',
        url:  '/shop',
        resolve: ShopOutlineComponent.resolve,
        views:
        {
            'shop-outline@base': {component: ShopOutlineComponent}
        },
        parent: 'admin',
        peek: true,
    },
    {
      name: 'shop-new',
      url:  '/shop/new',
      views:
      {
        'shop-new@base': {component: ShopNewComponent}
      },
      parent: 'admin', 
      peek: true
    },
    // --------shop stores -------------------
    {
      name: 'shop-stores',
      url:  '/shop/stores',
      resolve: StoreListComponent.resolve,
      views:
      {
        'shop-stores@base': {component: StoreListComponent}
      },
      parent: 'admin',
      peek: true
    },
    {
      name: 'shop-stores.new',
      url:  '/new',
      views:
      {
        'shop-stores-new@base': {component: StoreFormComponent}
      },
      peek: true
    },
    {
      name: 'shop-stores.edit',
      url:  '/:id/edit',
      params: {
        id: {type: "int"}
      },
      resolve: StoreFormComponent.resolve,
      views:
      {
        'shop-stores-edit@base': {component: StoreFormComponent}
      },
      peek: true
    },
    // -------------shop employees ------------
    {
      name: 'shop-employees',
      url:  '/shop/employees',
      resolve: EmployeeListComponent.resolve,
      views:
      {
        'shop-employees@base': {component: EmployeeListComponent}
      },
      parent: 'admin',
      peek: true
    },
    {
      name: 'shop-employees.new',
      url:  '/new',
      views:
      {
        'shop-employees-new@base': {component: EmployeeFormComponent}
      },
      resolve: EmployeeFormComponent.resolve.slice(1),
      peek: true
    },
    {
      name: 'shop-employees.edit',
      url:  '/:id/edit',
      params: {
        id: {type: "int"}
      },
      resolve: EmployeeFormComponent.resolve,
      views:
      {
        'shop-employees-edit@base': {component: EmployeeFormComponent}
      },
      peek: true
    }
]
