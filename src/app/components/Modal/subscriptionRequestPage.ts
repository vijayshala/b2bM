import { Sort } from "./sort";

export class SubscriptionRequestPage {
    sort: Sort;
    pageSize: number;
    pageNumber: number;
    offset: number;
    totalElements:number;
    paged: boolean;
    unpaged: boolean;
}