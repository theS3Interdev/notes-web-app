import { FormEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import CreatableReactSelect from 'react-select/creatable';
import { NoteData, Tag } from '@/app';

type NoteFormProps = {
	availableTags: Tag[];
	onAddTag: (tag: Tag) => void;
	onSubmit: (data: NoteData) => void;
} & Partial<NoteData>;

export default function NoteForm({
	availableTags,
	markdown = '',
	onAddTag,
	onSubmit,
	tags = [],
	title = '',
}: NoteFormProps) {
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
	const navigate = useNavigate();

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		onSubmit({
			title: titleRef.current!.value,
			markdown: markdownRef.current!.value,
			tags: selectedTags,
		});

		navigate('..');
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control ref={titleRef} required />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							<CreatableReactSelect
								value={selectedTags.map((tag) => {
									return { label: tag.label, value: tag.id };
								})}
								onChange={(tags) => {
									setSelectedTags(
										tags.map((tag) => {
											return { label: tag.label, id: tag.value };
										})
									);
								}}
								isMulti
							/>
						</Form.Group>
					</Col>
				</Row>

				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control ref={markdownRef} as="textarea" rows={16} required />
				</Form.Group>

				<Stack direction="horizontal" gap={2} className="justify-content-end">
					<Button type="submit" variant="primary">
						Save
					</Button>

					<Link to="..">
						<Button type="button" variant="outline-secondary">
							Cancel
						</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	);
}
