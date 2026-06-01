/**
 * Comment range preservation parity helpers.
 */

export interface CommentRange {
  readonly pos: number;
  readonly end: number;
  readonly text: string;
}

export interface CommentRangeCarrier {
  leadingComments?: readonly CommentRange[];
  trailingComments?: readonly CommentRange[];
}

export function copyCommentRanges(source: CommentRangeCarrier, target: CommentRangeCarrier): void {
  if (source.leadingComments !== undefined) target.leadingComments = [...source.leadingComments];
  if (source.trailingComments !== undefined) target.trailingComments = [...source.trailingComments];
}

export function appendLeadingComment(target: CommentRangeCarrier, comment: CommentRange): void {
  target.leadingComments = [...(target.leadingComments ?? []), comment];
}

export function appendTrailingComment(target: CommentRangeCarrier, comment: CommentRange): void {
  target.trailingComments = [...(target.trailingComments ?? []), comment];
}

export function shiftCommentRanges(comments: readonly CommentRange[], offset: number): readonly CommentRange[] {
  return comments.map(comment => ({ ...comment, pos: comment.pos + offset, end: comment.end + offset }));
}

export function commentsOverlap(left: CommentRange, right: CommentRange): boolean {
  return left.pos < right.end && right.pos < left.end;
}

export function sortCommentRanges(comments: readonly CommentRange[]): readonly CommentRange[] {
  return [...comments].sort((left, right) => left.pos - right.pos || left.end - right.end || left.text.localeCompare(right.text));
}

export function mergeAdjacentCommentRanges(comments: readonly CommentRange[]): readonly CommentRange[] {
  const sorted = sortCommentRanges(comments);
  const result: CommentRange[] = [];
  for (const comment of sorted) {
    const previous = result.at(-1);
    if (previous !== undefined && previous.end === comment.pos) {
      result[result.length - 1] = {
        pos: previous.pos,
        end: comment.end,
        text: `${previous.text}${comment.text}`,
      };
    } else {
      result.push(comment);
    }
  }
  return result;
}

export function filterDetachedComments(comments: readonly CommentRange[], nodePos: number): readonly CommentRange[] {
  return comments.filter(comment => comment.end <= nodePos);
}

export function filterAttachedComments(comments: readonly CommentRange[], nodePos: number, nodeEnd: number): readonly CommentRange[] {
  return comments.filter(comment => comment.pos >= nodePos && comment.end <= nodeEnd);
}

export function hasCommentWithText(comments: readonly CommentRange[], text: string): boolean {
  return comments.some(comment => comment.text.includes(text));
}

export function mapCommentText(comments: readonly CommentRange[], mapper: (text: string) => string): readonly CommentRange[] {
  return comments.map(comment => ({
    ...comment,
    text: mapper(comment.text),
  }));
}

export function removeOverlappingComments(comments: readonly CommentRange[]): readonly CommentRange[] {
  const sorted = sortCommentRanges(comments);
  const result: CommentRange[] = [];
  for (const comment of sorted) {
    const previous = result.at(-1);
    if (previous === undefined || !commentsOverlap(previous, comment)) result.push(comment);
  }
  return result;
}
