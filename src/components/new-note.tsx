import { NoteForm } from '@/components/note-form';
import { NoteData, Tag } from '@/app';

type NewNoteProps = {
	onSubmit: (data: NoteData) => void;
	onAddTag: (tag: Tag) => void;
	availableTags: Tag[];
};

export function NewNote({ availableTags, onAddTag, onSubmit }: NewNoteProps) {
	return (
		<>
			<h1 className="mb-4">New Note</h1>
			<NoteForm availableTags={availableTags} onAddTag={onAddTag} onSubmit={onSubmit} />
		</>
	);
}
