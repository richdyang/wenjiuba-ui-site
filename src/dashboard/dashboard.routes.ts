import {ShopNewComponent} from "./components/shop/shop-new";
import {ShopOverviewComponent} from "./components/shop/shop-overview";
import {StoreListComponent} from "./components/shop/store-list";
import {StoreFormComponent} from "./components/shop/store-form";
import {EmployeeFormComponent} from "./components/shop/employee-form";
import {EmployeeListComponent} from "./components/shop/employee-list";
import {ProductListComponent} from "./components/shop/product-list";
import {ProductFormComponent} from "./components/shop/product-form";
import {ProductPackageFormComponent} from "./components/shop/product-package-form";
import {CustomerListComponent} from "./components/shop/customer-list";
import {CustomerFormComponent} from "./components/shop/customer-form";
import {CustomerAccountComponent} from "./components/shop/customer-account";
import {DashboardComponent} from "./components/dashboard";
import {RecordListComponent} from "./components/shop/record-list";
import {RecordFormComponent} from "./components/shop/record-form";
import {RecordItemFormComponent} from "./components/shop/record-item-form";
import {RecordItemExtraFormComponent} from "./components/shop/record-item-extra-form";
import {ExpertFormComponent} from "./components/expert/expert-form";
import {ExpertEnoterReportListComponent} from "./components/expert/expert-enoter-report-list";

export const states:any[] = [
    {
        name: 'i',
        url:  '/i',
        component: DashboardComponent,
        resolve: DashboardComponent.resolve,
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
        parent: 'i',
        peek: true,
    },
    {
      name: 'shop-new',
      url:  '/shop/new',
      views:
      {
        'shop-new@base': {component: ShopNewComponent}
      },
      parent: 'i',
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
      parent: 'i',
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
      parent: 'i',
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
    // -------------shop products ------------
    {
        name: 'shop-products',
        url:  '/shop/products',
        resolve: ProductListComponent.resolve,
        views:
        {
            'shop-products@base': {component: ProductListComponent}
        },
        parent: 'i',
        peek: true
    },
    {
        name: 'shop-products.new',
        url:  '/new',
        views:
        {
            'shop-products-new@base': {component: ProductFormComponent}
        },
        // resolve: ProductFormComponent.resolve.slice(1),
        peek: true
    },
    {
        name: 'shop-products.edit',
        url:  '/:id/edit',
        params: {
            id: {type: "int"}
        },
        resolve: ProductFormComponent.resolve,
        views:
        {
            'shop-products-edit@base': {component: ProductFormComponent}
        },
        peek: true
    },
    {
        name: 'shop-products.new-package',
        url:  '/packages/new',
        views:
        {
            'shop-products-new-package@base': {component: ProductPackageFormComponent}
        },
        // resolve: ProductPackageFormComponent.resolve.slice(1),
        peek: true
    },
    {
        name: 'shop-products.edit-package',
        url:  '/packages/:id/edit',
        params: {
            id: {type: "int"}
        },
        resolve: ProductPackageFormComponent.resolve,
        views:
        {
            'shop-products-edit-package@base': {component: ProductPackageFormComponent}
        },
        peek: true
    },
    // -------------shop customers ------------
    {
        name: 'shop-customers',
        url:  '/shop/customers',
        resolve: CustomerListComponent.resolve,
        views:
        {
            'shop-customers@base': {component: CustomerListComponent}
        },
        parent: 'i',
        peek: true
    },
    {
        name: 'shop-customers.new',
        url:  '/new',
        views:
        {
            'shop-customers-new@base': {component: CustomerFormComponent}
        },
        resolve: EmployeeFormComponent.resolve.slice(1),
        peek: true
    },
    {
        name: 'shop-customers.edit',
        url:  '/:id/edit',
        params: {
            id: {type: "int"}
        },
        resolve: CustomerFormComponent.resolve,
        views:
        {
            'shop-customers-edit@base': {component: CustomerFormComponent}
        },
        peek: true
    },
    {
        name: 'shop-customers.account',
        url:  '/:id/account',
        params: {
            id: {type: "int"}
        },
        resolve: CustomerAccountComponent.resolve,
        views:
        {
            'shop-customers-account@base': {component: CustomerAccountComponent}
        },
        peek: true
    },
    // -------------shop records ------------
    {
        name: 'shop-records',
        url:  '/shop/records',
        resolve: RecordListComponent.resolve,
        views:
        {
            'shop-records@base': {component: RecordListComponent}
        },
        parent: 'i',
        peek: true
    },
    {
        name: 'shop-records.new',
        url:  '/new',
        views:
        {
            'shop-records-new@base': {component: RecordFormComponent}
        },
        resolve: RecordFormComponent.resolve_new,
        peek: true
    },
    {
        name: 'shop-records.record',
        url:  '/{recordId:int}',
        resolve: RecordFormComponent.resolve_edit,
        views:
        {
            'shop-records-record@base': {component: RecordFormComponent}
        },
        peek: true
    },
    {
        name: 'shop-records.record.new-item',
        url:  '/items/new',
        params: {
        },
        views:
        {
            'shop-records-record-new-item@base': {component: RecordItemFormComponent}
        },
        resolve: RecordItemFormComponent.resolve_new,
        peek: true
    },
    {
        name: 'shop-records.record.item',
        url:  '/items/{recordItemId:int}',
        resolve: RecordItemFormComponent.resolve_edit,
        views:
        {
            'shop-records-record-item@base': {component: RecordItemFormComponent}
        },
        peek: true
    },
    {
        name: 'shop-records.record.extra',
        url:  '/items/{recordItemId:int}/extra',
        resolve: RecordItemExtraFormComponent.resolve_edit,
        views:
        {
            'shop-records-record-extra@base': {component: RecordItemExtraFormComponent}
        },
        peek: true
    },
    // -------------shop records ------------
    {
        name: 'expert',
        url: '/expert',
        abstract: true,
        parent: 'i',
    },
    {
        name: 'expert.new',
        url:  '/new',
        resolve: RecordListComponent.resolve,
        views:
        {
            'expert-new@base': {component: ExpertFormComponent}
        },
        peek: true
    },
    {
        name: 'expert.enoter-reports',
        url:  '/enoter-reports',
        resolve: ExpertEnoterReportListComponent.resolve,
        views:
        {
            'expert-enoter-reports@base': {component: ExpertEnoterReportListComponent}
        },
        peek: true
    },
]
