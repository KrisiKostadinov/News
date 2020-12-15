import { User } from './user.model';

export class Post {
    title: string;
    content: string;
    subContent?: string;
    imageUrl?: string;
    categoryId: string;
    createdOn: Date;
    author?: User;
    isAuthor: boolean;
    likes: User[];
}