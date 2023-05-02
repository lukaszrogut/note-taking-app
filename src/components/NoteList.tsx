import { useMemo, useState } from "react"
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Stack,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { Tag } from "../App"
import styles from "../NoteList.modules.css?inline"

type SimplifiedNote = {
  tags: Tag[]
  title: string
  id: string
}

type NoteListProps = {
  availableTags: Tag[]
  notes: SimplifiedNote[]
  onUpdateTag: (id: string, label: string) => void
  onDeleteTag: (id: string) => void
}

type EditTagsModalProps = {
  availableTags: Tag[]
  show: boolean
  handleClose: () => void
}

export const NoteList = ({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState<string>("")
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState<boolean>(false)

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        ((title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
          selectedTags.length === 0) ||
        selectedTags.every((tag) =>
          note.tags.some((noteTag) => noteTag.id === tag.id)
        )
      )
    })
  }, [title, selectedTags, notes])
  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to='/new'>
              <Button variant='primary'>Create</Button>
            </Link>
            <Button
              onClick={() => setEditTagsModalIsOpen(true)}
              variant='secondary-outline'
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className='mb-4'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id }
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value }
                    })
                  )
                }}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id }
                })}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row className='g-4' xs={1} sm={2} lg={3} xl={4}>
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
        availableTags={availableTags}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
      />
    </>
  )
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className='align-items-center justify-content-center h-100'
        >
          <span className='fs-5'>{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction='horizontal'
              className='justify-content-center flex-wrap'
            >
              {tags.map((tag) => (
                <Badge className='text-truncate' key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  )
}

function EditTagsModal({
  availableTags,
  show,
  handleClose,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control type='text' value={tag.label} />
                </Col>
                <Col xs='auto'>
                  <Button variant='outline-danger'>&times;</Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
