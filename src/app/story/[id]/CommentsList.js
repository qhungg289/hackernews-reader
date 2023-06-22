import Comment from "./Comment";

export default function CommentsList({ comments }) {
	const commentsList = [];

	for (let i = 0; i < comments.length; i++) {
		if (comments[i].deleted) continue;

		commentsList.push(
			<Comment
				key={comments[i].id}
				comment={comments[i]}
				prevId={i != 0 ? comments[i - 1].id : null}
				nextId={i != comments.length - 1 ? comments[i + 1].id : null}
			/>,
		);
	}

	return <>{commentsList}</>;
}
