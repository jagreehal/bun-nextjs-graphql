import { faker } from '@faker-js/faker';

faker.seed(123);

interface UserParameters {
	id: string;
	firstName?: string;
	lastName?: string;
}

export class User {
	firstName: string;
	lastName: string;
	id: string;

	constructor(params: UserParameters) {
		this.id = params.id;
		this.firstName = params.firstName ?? faker.person.firstName();
		this.lastName = params.lastName ?? faker.person.lastName();
	}
}

interface PostParameters {
	id: string;
	authorId?: string;
	title?: string;
	content?: string;
}

export class Post {
	id: string;
	authorId: string;
	title: string;
	content: string;

	constructor(params: PostParameters) {
		this.id = params.id;
		this.authorId =
			params.authorId ?? String(faker.number.int({ min: 1, max: 100 }));
		this.title = params.title ?? faker.lorem.sentence();
		this.content = params.content ?? faker.lorem.paragraphs(2);
	}
}

interface CommentParameters {
	id: string;
	authorId?: string;
	postId?: string;
	comment?: string;
}

export class Comment {
	id: string;
	postId: string;
	authorId: string;
	comment: string;

	constructor(params: CommentParameters) {
		this.id = params.id;
		this.authorId =
			params.authorId ?? String(faker.number.int({ min: 1, max: 100 }));
		this.postId =
			params.postId ?? String(faker.number.int({ min: 1, max: 100 }));
		this.comment = params.comment ?? faker.lorem.paragraphs(1);
	}
}

export const Users = new Map<string, User>();
export const Posts = new Map<string, Post>();
export const Comments = new Map<string, Comment>();

// Create 100 users, posts and comments
for (let i = 1; i <= 100; i += 1) {
	Users.set(String(i), new User({ id: String(i) }));
	Posts.set(String(i), new Post({ id: String(i) }));
	Comments.set(String(i), new Comment({ id: String(i) }));
}
