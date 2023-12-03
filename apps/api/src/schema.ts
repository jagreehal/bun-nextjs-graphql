import { builder } from './builder';
import { Comment, Comments, Post, Posts, User, Users } from './data';

builder.objectType(User, {
	name: 'User',
	fields: (t) => ({
		id: t.exposeID('id'),
		firstName: t.exposeString('firstName'),
		lastName: t.exposeString('lastName'),
		fullName: t.string({
			resolve: (user) => `${user.firstName} ${user.lastName}`,
		}),
		posts: t.field({
			type: [Post],
			resolve: (user) =>
				[...Posts.values()].filter((post) => post.authorId === user.id),
		}),
		comments: t.field({
			type: [Comment],
			resolve: (user) =>
				[...Comments.values()].filter(
					(comment) => comment.authorId === user.id,
				),
		}),
	}),
});

builder.objectType(Post, {
	name: 'Post',
	fields: (t) => ({
		id: t.exposeID('id'),
		title: t.exposeString('title'),
		content: t.exposeString('content'),
		author: t.field({
			type: User,
			nullable: true,
			resolve: (post) =>
				[...Users.values()].find((user) => user.id === post.authorId),
		}),
		comments: t.field({
			type: [Comment],
			resolve: (post) =>
				[...Comments.values()].filter((comment) => comment.postId === post.id),
		}),
	}),
});

builder.objectType(Comment, {
	name: 'Comment',
	fields: (t) => ({
		id: t.exposeID('id'),
		comment: t.exposeString('comment'),
		author: t.field({
			type: User,
			nullable: true,
			resolve: (post) =>
				[...Users.values()].find((user) => user.id === post.authorId),
		}),
		post: t.field({
			type: Post,
			resolve: (comment) =>
				[...Posts.values()].find((post) => post.id === comment.postId)!,
		}),
	}),
});

const DEFAULT_PAGE_SIZE = 10;

builder.queryType({
	fields: (t) => ({
		post: t.field({
			type: Post,
			nullable: true,
			args: {
				id: t.arg.id({ required: true }),
			},
			resolve: (root, args) => Posts.get(String(args.id)),
		}),
		posts: t.field({
			type: [Post],
			nullable: true,
			args: {
				take: t.arg.int(),
				skip: t.arg.int(),
			},
			resolve: (root, { skip, take }) =>
				[...Posts.values()].slice(
					skip ?? 0,
					(skip ?? 0) + (take ?? DEFAULT_PAGE_SIZE),
				),
		}),
		user: t.field({
			type: User,
			nullable: true,
			args: {
				id: t.arg.id({ required: true }),
			},
			resolve: (root, args) => Users.get(String(args.id)),
		}),
	}),
});

builder.mutationType({
	fields: (t) => ({
		createPost: t.field({
			type: Post,
			args: {
				authorId: t.arg.id({ required: true }),
				title: t.arg.string({ required: true }),
				content: t.arg.string({ required: true }),
			},
			resolve: (_, args) => {
				const newPost: Post = {
					id: String(Posts.size + 1),
					authorId: String(args.authorId),
					title: args.title,
					content: args.content,
				};
				Posts.set(newPost.id, newPost);
				return newPost;
			},
		}),
		createComment: t.field({
			type: Comment,
			args: {
				authorId: t.arg.id({ required: true }),
				postId: t.arg.id({ required: true }),
				comment: t.arg.string({ required: true }),
			},
			resolve: (_, args) => {
				const newComment: Comment = {
					id: String(Posts.size + 1),
					authorId: String(args.authorId),
					postId: String(args.postId),
					comment: args.comment,
				};
				Comments.set(newComment.id, newComment);
				return newComment;
			},
		}),
	}),
});

export const schema = builder.toSchema();
