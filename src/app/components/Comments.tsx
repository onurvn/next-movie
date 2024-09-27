"use client";
import Link from "next/link";

interface CommentsProps {
    movieId: string;
}

const Comments = ({  }: CommentsProps) => {
  
    const comments = [
        { id: 1, text: "Bu film harikaydı!" },
        { id: 2, text: "Çok beğenmedim, sıkıcıydı." },
    ];

    return (
        <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">Yorumlar</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id} className="mb-2">
                        {comment.text}
                    </li>
                ))}
            </ul>
            <Link className="p-2 bg-blue-500 text-white rounded" href="/">Geri Dön</Link>
        </div>
    );
};

export default Comments;
