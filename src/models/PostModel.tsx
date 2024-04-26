import { IPost } from "@/interfaces/IPost";
import prisma from "../../lib/prisma"
import { IPostCreateItems } from "@/interfaces/IPostCreateItems";

export const LastPublishedPosts = async (limit: number) => {
    var posts = await prisma.post.findMany({
        where: {
            published: true,
        },
        take: limit,
        orderBy: {
            id: 'desc'
        },
        include: {
            author: {
                select: {
                    id: true,
                    uuid: true,
                    name: true,
                    email: true,
                    role: true
                }
            }
        }
    });

    if (posts) {
        if (posts.length > 0) {
            return posts;
        }
        return "Post bulunamadı.";
    }

    return "Database error occured."
}

export const AddPost = async (authorId: number, post: IPostCreateItems) => {
    var nPost = await prisma.post.create({
        data: {
            content: post.content,
            title: post.title,
            published: post.published,
            authorId: authorId,
        }
    });

    if (nPost) {
        return nPost;
    }

    return "Database error occured."
}

export const UpdatePost = async (postId: number, post: IPostCreateItems) => {
    var nPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            content: post.content,
            title: post.title,
            published: post.published
        }
    });

    if (nPost) {
        return nPost;
    }

    return "Database error occured."
}