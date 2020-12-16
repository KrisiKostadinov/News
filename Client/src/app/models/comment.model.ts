import { User } from './user.model';

export class Comment {
    _id?: string;
    content: string;
    author?: User;
    isAuthor?: boolean;
    createdOn?: any;
}