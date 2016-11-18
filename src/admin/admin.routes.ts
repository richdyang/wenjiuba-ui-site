import {ShopNewComponent} from "./components/shop/shop-new";
import {ShopOverviewComponent} from "./components/shop/shop-overview";
import {StoreListComponent} from "./components/shop/store-list";
import {StoreFormComponent} from "./components/shop/store-form";
import {EmployeeFormComponent} from "./components/shop/employee-form";
import {EmployeeListComponent} from "./components/shop/employee-list";
import {AdminComponent} from "./components/admin";
import {ServiceListComponent} from "./components/shop/service-list";
import {ServiceFormComponent} from "./components/shop/service-form";
import {ServicePackageFormComponent} from "./components/shop/service-package-form";

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
        resolve: ShopOverviewComponent.resolve,
        views:
        {
            'shop-outline@base': {component: ShopOverviewComponent}
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
    },
    // -------------shop services ------------
    {
        name: 'shop-services',
        url:  '/shop/services',
        resolve: ServiceListComponent.resolve,
        views:
        {
            'shop-services@base': {component: ServiceListComponent}
        },
        parent: 'admin',
        peek: true
    },
    {
        name: 'shop-services.new',
        url:  '/new',
        views:
        {
            'shop-services-new@base': {component: ServiceFormComponent}
        },
        // resolve: ServiceFormComponent.resolve.slice(1),
        peek: true
    },
    {
        name: 'shop-services.edit',
        url:  '/:id/edit',
        params: {
            id: {type: "int"}
        },
        resolve: ServiceFormComponent.resolve,
        views:
        {
            'shop-services-edit@base': {component: ServiceFormComponent}
        },
        peek: true
    },
    {
        name: 'shop-services.new-package',
        url:  '/packages/new',
        views:
        {
            'shop-services-new-package@base': {component: ServicePackageFormComponent}
        },
        // resolve: ServicePackageFormComponent.resolve.slice(1),
        peek: true
    },
    {
        name: 'shop-services.edit-package',
        url:  '/packages/:id/edit',
        params: {
            id: {type: "int"}
        },
        resolve: ServicePackageFormComponent.resolve,
        views:
        {
            'shop-services-edit-package@base': {component: ServicePackageFormComponent}
        },
        peek: true
    }
]
