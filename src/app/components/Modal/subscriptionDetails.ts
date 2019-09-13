import { Sort } from "./sort";

export class SubscriptionDetails {
    sort: Sort;
    pageSize: number;
    pageNumber: number;
    offset: number;
    totalElements:number;
    paged: boolean;
    unpaged: boolean;
}