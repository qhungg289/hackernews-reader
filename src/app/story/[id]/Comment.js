"use client";

import { diffFromUnixSecondToNow } from "@/utils/time";
import { scrollToElement } from "@/utils/DOM";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function Comment({ comment }) {
	const [isShow, setIsShow] = useState(true);
	const params = useParams();

	return (
		<div className="relative">
			<div className="my-4">
				<div className="flex justify-between text-sm text-zinc-500">
					<span id={comment.id} className="scroll-mt-20">
						{comment.by} {diffFromUnixSecondToNow(comment.time)}
					</span>
					<div className="space-x-2">
						{comment.parent != params.id && (
							<button
								onClick={() => scrollToElement(comment.parent)}
								className="hover:underline"
							>
								Parent
							</button>
						)}
						<button
							onClick={() => setIsShow(!isShow)}
							className="hover:underline"
						>
							{isShow ? "Hide" : "Show"}
						</button>
					</div>
				</div>
				{isShow && (
					<>
						<div
							dangerouslySetInnerHTML={{ __html: comment.text }}
							className="prose dark:prose-invert"
						></div>
						{comment.kids && (
							<div className="ml-8">
								{comment.kids.map((c) => (
									<Comment key={c.id} comment={c} />
								))}
							</div>
						)}
					</>
				)}
			</div>
			<div
				onClick={() => setIsShow(!isShow)}
				className="h-full w-[0.15rem] bg-zinc-700 hover:bg-zinc-600 absolute inset-y-0 -left-2 rounded transition-colors cursor-pointer"
			></div>
		</div>
	);
}
