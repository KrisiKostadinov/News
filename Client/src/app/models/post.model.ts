import { User } from './user.model';
import { Category } from './category.model';
import { Comment } from './comment.model';

export class Post {
    _id: string;
    title: string;
    content: string;
    subContent?: string;
    imageUrl?: string;
    category?: Category;
    createdOn: Date;
    author?: User;
    isAuthor: boolean;
    likes: string[];
    comments: Comment[];
    createdOnAsString?: string;
    isLiked: boolean;
}