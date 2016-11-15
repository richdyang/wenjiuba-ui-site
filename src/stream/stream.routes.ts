

import {StreamListComponent} from "./components/stream-list";
export const states:any[] = [
    {
        name: 'stream',
        url:  '/stream',
        component: StreamListComponent,
        resolve: StreamListComponent.resolve,
        parent: 'base'
    }
]
