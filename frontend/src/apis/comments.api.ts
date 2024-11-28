const URL = import.meta.env.VITE_BACKEND_API_BASE_URL;


interface CreateCommentData {
    post: string;
    text: string;
}

interface CreateReplyData {
    post: string;
    replyText: string;
    parentComment: string;
}

export interface DeleteCommentData{
    commentId:string;
    rootCommentId?:string;
}


export interface UpdateCommentData extends CreateCommentData {
    commentId: string;
    rootCommentId?: string;
}

export const createNewComment = async (myCommentData: CreateCommentData) => {
    const response = await fetch(`${URL}/api/comments/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(myCommentData)
    });

    if (!response.ok) {
        throw new Error("Failed to create comment!");
    }

    return response.json();
};

export const createReply = async (myReplyData: CreateReplyData) => {
    const response = await fetch(`${URL}/api/comments/reply`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myReplyData),
    });

    if (!response.ok) {
        throw new Error("Failed to create comment!");
    }

    return response.json();
};
export const updateComment = async (myCommentData: UpdateCommentData) => {
    const response = await fetch(`${URL}/api/comments/update-comment`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myCommentData),
    });

    if (!response.ok) {
        throw new Error("Failed to create comment!");
    }

    return response.json();
};
export const deleteComment = async (myCommentData: DeleteCommentData) => {
    const response = await fetch(`${URL}/api/comments/delete`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(myCommentData),
    });

    if (!response.ok) {
        throw new Error("Failed to delete comment!");
    }

    return response.json();
};
