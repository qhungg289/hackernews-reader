import Comment from "./Comment";

export default function CommentsList({ comments }) {
	return (
		<>
			{comments.map(
				(comment) =>
					comment.deleted ?? (
						<Comment key={comment.id} comment={comment} />
					),
			)}
		</>
	);
}
