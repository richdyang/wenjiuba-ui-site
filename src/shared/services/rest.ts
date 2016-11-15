// import {Injectable} from "@angular/core";
// import {ApiService} from "./api";
//
// /**
//  * Generate provider
//  *
//  * @param resource
//  * @param id
//  * @returns {Provider}
//  */
// // export function provideRest(resources:string[], id:string = 'id') {
// //     return provide(RestService, {
// //         useFactory: (apiService) => {
// //             let rest = new RestService(apiService);
// //             rest.resources = resources;
// //             rest.id = id;
// //             return rest;
// //         },
// //         deps: [ApiService]
// //     })
// // }
//
// /**
//  * Register provider: RestService.provides(['questions'])
//  *
//  * Than inject to constructor
//  */
// @Injectable()
// export class RestService {
//     constructor(public apiService: ApiService) {}
//
//     resources:string[];
//     // id field name
//     id:string;
//
//     // [questions]  []
//     // [questions]  [1]
//     // [questions, answers]  [1]
//     // [questions, answers]  [1, 2]
//     private url(ids:any[]):string {
//         var url = '';
//         for(let i=0; i < ids.length; ++i) {
//             url += '/'  + this.resources[i] + '/' + ids[i];
//         }
//
//         if(this.resources.length > ids.length) {
//             url += '/' + this.resources[this.resources.length-1];
//         }
//         return url;
//     }
//
//     load(...ids: any[]):Promise<any> {
//
//         return this.apiService.get(this.url(ids));
//     }
//
//     loadAll(...ids:any[]):Promise<any> {
//         return this.apiService.get(this.url(ids));
//     }
//
//     create(data:any, ...ids:any[]):Promise<any> {
//         return this.apiService.post(this.url(ids), data);
//     }
//
//     $update(id:any, data:any, ...ids:any[]):Promise<any> {
//         ids.push(id);
//         return this.apiService.put(this.url(ids), data);
//     }
//
//     /**
//      * default id name is 'id', check if it exists
//      *
//      * @param data
//      * @returns {Promise<any>}
//      */
//     update(data:any, ...ids:any[]):Promise<any> {
//         if(!data[this.id]) throw `${this.id} not exist in ${data}`
//         return this.$update(data[this.id], data, ...ids);
//     }
//
//     /**
//      * default id name is 'id', check if it exists
//      *
//      * @param data
//      * @returns {Promise<any>}
//      */
//     save(data:any, ...ids:any[]):Promise<any> {
//         return !data[this.id] ? this.create(data, ...ids) : this.update(data, ...ids);
//     }
//
//     /**
//      * update partially
//      *
//      * @param id
//      * @param data
//      * @returns {Promise<any>}
//      */
//     patch(id:any, data:any, ...ids:any[]):Promise<any> {
//         ids.push(id);
//         return this.apiService.patch(this.url(ids), data);
//     }
//
//     delete(...ids:any[]):Promise<any> {
//         return this.apiService.delete(this.url(ids));
//     }
// }
