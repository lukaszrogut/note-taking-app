import { NoteData, Tag } from "../App"
import { NoteForm } from "./NoteForm"

export type NewNoteProps = {
  availableTags: Tag[]
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
}

export const NewNote = ({
  onSubmit,
  onAddTag,
  availableTags,
}: NewNoteProps) => {
  return (
    <div>
      <h1 className='mb-4'>New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  )
}
