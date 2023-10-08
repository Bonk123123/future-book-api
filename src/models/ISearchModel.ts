import { orderBy } from '../utils/orderBy';
import { subjects } from '../utils/subjects';

export interface ISearchModel {
    stepPagination: number;
    indexPagination: number;
    q: string;
    subject: keyof typeof subjects;
    orderBy: keyof typeof orderBy;
}
