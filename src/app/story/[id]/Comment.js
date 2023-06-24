"use client";

import { diffFromUnixSecondToNow } from "@/utils/time";
import { scrollToElement } from "@/utils/DOM";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function Comment({ comment, prevId, nextId, rootId }) {
	const [isShow, setIsShow] = useState(true);
	const params = useParams();

	const commentKids = [];

	if (comment.kids) {
		for (let i = 0; i < comment.kids.length; i++) {
			if (comment.kids[i].deleted) continue;

			commentKids.push(
				<Comment
					key={comment.kids[i].id}
					comment={comment.kids[i]}
					prevId={i != 0 ? comment.kids[i - 1].id : null}
					nextId={
						i != comment.kids.length - 1
							? comment.kids[i + 1].id
							: null
					}
					rootId={rootId}
				/>,
			);
		}
	}

	return (
		<div className="relative">
			<div className="my-6">
				<div className="flex gap-1 flex-wrap text-sm text-neutral-400 dark:text-neutral-500">
					<span id={comment.id} className="scroll-mt-20">
						{comment.by} {diffFromUnixSecondToNow(comment.time)}
					</span>
					{rootId &&
						comment.parent != rootId &&
						rootId != comment.id && (
							<>
								<span>|</span>
								<button
									onClick={() => scrollToElement(rootId)}
									className="hover:underline"
								>
									root
								</button>
							</>
						)}
					{comment.parent != params.id && (
						<>
							<span>|</span>
							<button
								onClick={() => scrollToElement(comment.parent)}
								className="hover:underline"
							>
								parent
							</button>
						</>
					)}
					{prevId && (
						<>
							<span>|</span>
							<button
								onClick={() => scrollToElement(prevId)}
								className="hover:underline"
							>
								prev
							</button>
						</>
					)}
					{nextId && (
						<>
							<span>|</span>
							<button
								onClick={() => scrollToElement(nextId)}
								className="hover:underline"
							>
								next
							</button>
						</>
					)}
					<button
						onClick={() => setIsShow(!isShow)}
						className="hover:underline"
					>
						{isShow ? "[-]" : "[+]"}
					</button>
				</div>
				{isShow && (
					<>
						<div
							dangerouslySetInnerHTML={{ __html: comment.text }}
							className="prose prose-neutral dark:prose-invert max-w-none border-b-2 border-neutral-200 dark:border-neutral-800 pb-6"
						></div>
						{comment.kids && (
							<div className="ml-4 md:ml-8">{commentKids}</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
