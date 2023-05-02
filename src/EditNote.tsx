import { NoteData, Tag } from "./App"
import { NoteForm } from "./components/NoteForm"
import { useNote } from "./layout/NoteLayout"

export type EditNoteProps = {
  availableTags: Tag[]
  onSubmit: (id: string, data: NoteData) => void
  onAddTag: (tag: Tag) => void
}

export const EditNote = ({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteProps) => {
  const note = useNote()
  return (
    <div>
      <h1 className='mb-4'>Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  )
}
