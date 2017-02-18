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
import {ExpertEnoterReportFormComponent} from "./components/expert/expert-enoter-report-form";
import {RecordDetailComponent} from "./components/shop/record-detail";
import {ApiService} from "../shared/services/api";
import {Transition} from "ui-router-ng2/ng2";
import {ShopFormComponent} from "./components/shop/shop-form";
import {PaymentComponent} from "../shared/components/payment";

export const states: any[] = [
    {
        name: 'i',
        url: '/i',
        component: DashboardComponent,
        resolve: DashboardComponent.resolve,
        parent: 'base'
    },
    {
        name: 'shop',
        url: '/shop',
        abstract: true,
        parent: 'i',
        resolve: [
            {
                token: 'shop',
                deps: [ApiService],
                resolveFn: (api) => api.get('/shop')
            }
        ]
    },
    {
        name: 'shop.overview',
        url: '/overview',
        views: {
            'shop-overview@base': {component: ShopOverviewComponent}
        },
        peek: true,
        resolve: [
            {
                token: 'shopAccount',
                deps: [ApiService],
                resolveFn: (api) => api.get('/shop/account')
            }
        ],
    },
    {
        name: 'shop.new',
        url: '/new',
        views: {
            'shop-new@base': {component: ShopNewComponent}
        },
        peek: true
    },
    {
        name: 'shop.overview.edit',
        url: '/edit',
        views: {
            'shop-overview-edit@base': {component: ShopFormComponent}
        },
        peek: true
    },
    {
        name: 'shop.overview.payment',
        url: '/payment',
        views: {
            'shop-overview-payment@base': {component: PaymentComponent}
        },
        params: {
            alipayTrade: { },
            returnTo: 'shop.overview'
        },
        peek: true,
        resolve: PaymentComponent.resolve
    },
    // --------shop stores -------------------
    {
        name: 'shop.stores',
        url: '/stores',
        views: {
            'shop-stores@base': {component: StoreListComponent}
        },
        peek: true,
        resolve: [
            {
                token: 'stores',
                deps: [ApiService],
                resolveFn: (api) => api.get('/shop/stores')
            }
        ]
    },
    {
        name: 'shop.stores.new',
        url: '/new',
        views: {
            'shop-stores-new@base': {component: StoreFormComponent}
        },
        peek: true
    },
    {
        name: 'shop.stores.store',
        url: '/{storeId:int}',
        abstract: true,
        resolve: [
            {
                token: 'store',
                deps: [ApiService, Transition],
                resolveFn: (api, transition) => api.get(`/shop/stores/${transition.params().storeId}`)
            }
        ]
    },
    {
        name: 'shop.stores.store.edit',
        url: '/edit',
        views: {
            'shop-stores-store-edit@base': {component: StoreFormComponent}
        },
        peek: true
    },
    // -------------shop employees ------------
    {
        name: 'shop.employees',
        url: '/employees',
        views: {
            'shop-employees@base': {component: EmployeeListComponent}
        },
        peek: true,
        resolve: [
            {
                token: 'employees',
                deps: [ApiService],
                resolveFn: (api) => api.get('/shop/employees')
            }
        ]
    },
    {
        name: 'shop.employees.new',
        url: '/new',
        views: {
            'shop-employees-new@base': {component: EmployeeFormComponent}
        },
        peek: true,
        resolve: EmployeeFormComponent.resolve_select
    },
    {
        name: 'shop.employees.employee',
        url: '/{employeeId:int}',
        abstract: true,
        resolve: [
            {
                token: 'employee',
                deps: [ApiService,Transition],
                resolveFn: (api, transition) => api.get(`/shop/employees/${transition.params().employeeId}`)
            }
        ]
    },
    {
        name: 'shop.employees.employee.edit',
        url: '/edit',
        views: {
            'shop-employees-employee-edit@base': {component: EmployeeFormComponent}
        },
        peek: true,
        resolve: EmployeeFormComponent.resolve_select
    },
    // -------------shop products ------------
    {
        name: 'shop.products',
        url: '/products',
        views: {
            'shop-products@base': {component: ProductListComponent}
        },
        peek: true,
        resolve: [
            {
                token: 'products',
                deps: [ApiService],
                resolveFn: (api) => api.get('/shop/products')
            },
            {
                token: 'productPackages',
                deps: [ApiService],
                resolveFn: (api) => api.get('/shop/products/packages')
            }
        ]
    },
    {
        name: 'shop.products.new',
        url: '/new',
        views: {
            'shop-products-new@base': {component: ProductFormComponent}
        },
        peek: true
    },
    {
        name: 'shop.products.product',
        url: '/{productId:int}',
        abstract: true,
        resolve: [
            {
                token: 'product',
                deps: [ApiService,Transition],
                resolveFn: (api, transition) => api.get(`/shop/products/${transition.params().productId}`)
            },
        ]
    },
    {
        name: 'shop.products.product.edit',
        url: '/edit',
        views: {
            'shop-products-product-edit@base': {component: ProductFormComponent}
        },
        peek: true
    },
    {
        name: 'shop.products.packages',
        url: '/packages',
        abstract: true
    },
    {
        name: 'shop.products.packages.new',
        url: '/new',
        views: {
            'shop-products-packages-new@base': {component: ProductPackageFormComponent}
        },
        peek: true
    },
    {
        name: 'shop.products.packages.package',
        url: '/{productPackageId:int}',
        abstract: true,
        resolve: [
            {
                token: 'productPackage',
                deps: [ApiService,Transition],
                resolveFn: (api, transition) => api.get(`/shop/products/packages/${transition.params().productPackageId}`)
            }
        ]
    },
    {
        name: 'shop.products.packages.package.edit',
        url: '/edit',
        views: {
            'shop-products-packages-package-edit@base': {component: ProductPackageFormComponent}
        },
        peek: true
    },
    // -------------shop customers ------------
    {
        name: 'shop.customers',
        url: '/customers',
        views: {
            'shop-customers@base': {component: CustomerListComponent}
        },
        peek: true,
        resolve: [
            {
                token: 'customers',
                deps: [ApiService],
                resolveFn: (api) => api.get('/shop/customers')
            }
        ]
    },
    {
        name: 'shop.customers.new',
        url: '/new',
        views: {
            'shop-customers-new@base': {component: CustomerFormComponent}
        },
        peek: true,
        resolve: CustomerFormComponent.resolve_select
    },
    {
        name: 'shop.customers.customer',
        url: '/{customerId:int}',
        abstract: true,
        resolve: [
            {
                token: 'customer',
                deps: [ApiService,Transition],
                resolveFn: (api, transition) => api.get(`/shop/customers/${transition.params().customerId}`)
            }
        ]
    },
    {
        name: 'shop.customers.customer.edit',
        url: '/edit',
        views: {
            'shop-customers-customer-edit@base': {component: CustomerFormComponent}
        },
        peek: true,
        resolve: CustomerFormComponent.resolve_select
    },
    {
        name: 'shop.customers.customer.account',
        url: '/account',
        views: {
            'shop-customers-customer-account@base': {component: CustomerAccountComponent}
        },
        peek: true,
        resolve: [
            {
                token: 'account',
                deps: [ApiService,Transition],
                resolveFn: (api, transition) => api.get(`/shop/customers/${transition.params().customerId}/account`)
            }
        ]
    },
    // -------------shop records ------------
    {
        name: 'shop.records',
        url: '/records',
        views: {
            'shop-records@base': {component: RecordListComponent}
        },
        peek: true,
        resolve: [
            {
                token: 'records',
                deps: [ApiService],
                resolveFn: (api) => api.get('/shop/records')
            }
        ]
    },
    {
        name: 'shop.records.new',
        url: '/new',
        views: {
            'shop-records-new@base': {component: RecordFormComponent}
        },
        peek: true,
        resolve: RecordFormComponent.resolve_select
    },
    {
        name: 'shop.records.record',
        url: '/{recordId:int}',
        views: {
            'shop-records-record@base': {component: RecordDetailComponent}
        },
        peek: true,
        resolve: [
            {
                token: 'record',
                deps: [ApiService, Transition],
                resolveFn: (api, transition) => api.get(`/shop/records/${transition.params().recordId}`)
            }
        ]
    },
    {
        name: 'shop.records.record.edit',
        url: '/edit',
        views: {
            'shop-records-record-edit@base': {component: RecordFormComponent}
        },
        peek: true,
        resolve: RecordFormComponent.resolve_select
    },
    {
        name: 'shop.records.record.items',
        url: '/items',
        abstract: true
    },
    {
        name: 'shop.records.record.items.new',
        url: '/new',
        params: {},
        views: {
            'shop-records-record-items-new@base': {component: RecordItemFormComponent}
        },
        peek: true,
        resolve: RecordItemFormComponent.resolve_select,
    },
    {
        name: 'shop.records.record.items.item',
        url: '/{recordItemId:int}',
        abstract: true,
        resolve: [
            {
                token: 'recordItem',
                deps: [ApiService,Transition],
                resolveFn: (api, transition) => api.get(`/shop/records/${transition.params().recordId}/items/${transition.params().recordItemId}`)
            }
        ]
    },
    {
        name: 'shop.records.record.items.item.edit',
        url: '/edit',
        resolve: RecordItemFormComponent.resolve_select,
        views: {
            'shop-records-record-items-item-edit@base': {component: RecordItemFormComponent}
        },
        peek: true
    },
    {
        name: 'shop.records.record.items.item.extra',
        url: '/extra',
        views: {
            'shop-records-record-items-item-extra@base': {component: RecordItemExtraFormComponent}
        },
        peek: true,
        resolve: [
            {
                token: 'package',
                deps: [ApiService,Transition],
                resolveFn: (api, transition) => api.get(`/enoter/packages/default`)
            },
            {
                token: 'extra',
                deps: [ApiService,Transition],
                resolveFn: (api, transition) => api.get(`/shop/records/${transition.params().recordId}/items/${transition.params().recordItemId}/extra`)
            }
        ]
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
        url: '/new',
        views: {
            'expert-new@base': {component: ExpertFormComponent}
        },
        peek: true
    },
    {
        name: 'expert.enoter-reports',
        url: '/enoter-reports',
        views: {
            'expert-enoter-reports@base': {component: ExpertEnoterReportListComponent}
        },
        peek: true,
        resolve: [
            {
                token: 'reports',
                deps: [ApiService,Transition],
                resolveFn: (api, transition) => api.get(`/expert/enoterReports`)
            }
        ]
    },
    {
        name: 'expert.enoter-reports.report',
        url: '/{reportId:int}',
        abstract: true,
        resolve: [
            {
                token: 'report',
                deps: [ApiService,Transition],
                resolveFn: (api, transition) => api.get(`/expert/enoterReports/${transition.params().reportId}`)
            }
        ]
    },
    {
        name: 'expert.enoter-reports.report.review',
        url: '/review',
        views: {
            'expert-enoter-reports-report-review@base': {component: ExpertEnoterReportFormComponent}
        },
        peek: true
    },
]
