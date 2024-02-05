import { useState, useEffect } from "react";
import Header from "./Header";
import TextEditor from "./TextEditor";
import LableDropdown from "./LableDropdown";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "../styles/notesApp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMagnifyingGlass,
  faArrowTrendUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import {
  FormValues,
  ColorLable,
  colorOptions,
  Notedata,
} from "../interface/Interfaces";
import NoteSlider from "./NoteSlider";
import DeleteModal from "./DeleteModal";

const NotesDashboard = () => {
  const [notesFields, setNotesFields] = useState({
    title: "Title" as string,
    changeInput: false as boolean,
    label: {} as ColorLable | undefined,
    noteText: "" as string,
    allNotes: [] as Notedata[],
    showEditor: false as boolean,
    searchNote: "" as string,
    selectedNote: null as Notedata | null,
    editNote: false as boolean,
    deletModal: false as boolean,
    noteId: "" as string,
  });

  const getColor = notesFields.label?.color;
  const getLable = notesFields.label?.label;

  console.log(notesFields.editNote, "editnote");
  const getNotesData = async () => {
    try {
      const response = await fetch("http://localhost:3001/notes");
      const getNotes = await response.json();
      const filteredNotes = getNotes.filter((item: Notedata) =>
        item.title?.toLowerCase().includes(notesFields.searchNote.toLowerCase())
      );
      setNotesFields((prevData) => ({ ...prevData, allNotes: filteredNotes }));
    } catch (error) {
      console.log(error, "getting error while fetching data");
    }
  };

  useEffect(() => {
    getNotesData();
  }, [notesFields.searchNote]);

  const handleChangeInput = (e: any) => {
    setNotesFields((prevData) => ({
      ...prevData,
      changeInput: true,
      title: e.target.value,
    }));
  };
  const handleChangeText = (e: any) => {
    setNotesFields((prevData) => ({
      ...prevData,
      changeInput: false,
      title: prevData.title ? e.target.value : "Title",
    }));
  };

  const user = sessionStorage.getItem("loginUser");
  let getName;
  let userFullName: string;
  if (user) {
    const getUser: FormValues = JSON.parse(user);
    userFullName = `${getUser.firstName} ${getUser.lastName}`;
    getName = `${getUser.firstName?.charAt(0).toUpperCase()}${getUser.lastName
      ?.charAt(0)
      .toUpperCase()}`;
  }
  // for current time
  const currDate = new Date().toLocaleDateString();
  const currTime = new Date().toLocaleTimeString();

  const handleIconClick = () => {
    if (notesFields.selectedNote) {
      setNotesFields((prevData: any) => ({
        ...prevData,
        label: {
          label: notesFields.selectedNote?.label,
          color: notesFields.selectedNote?.color,
        },
        title: notesFields.selectedNote?.title || "Title",
        noteText: notesFields.selectedNote?.textData,
        editNote: true,
      }));
    } else {
      setNotesFields((prevData) => ({
        ...prevData,
        showEditor: !prevData.showEditor,
        editNote: false,
      }));
    }
  };
  const handleEditNote = (note: Notedata) => {
    setNotesFields((prevData) => ({ ...prevData, selectedNote: note }));
    handleIconClick();
  };

  const postNotesData = async () => {
    try {
      if (notesFields.editNote && notesFields.selectedNote) {
        const response = await fetch(
          `http://localhost:3001/notes/${notesFields.selectedNote.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: notesFields.title,
              label: getLable,
              color: getColor,
              date: currDate,
              creatBy: userFullName,
              textData: notesFields.noteText,
            }),
          }
        );
        if (response.ok) {
          setNotesFields((prevData) => ({
            ...prevData,
            showEditor: !notesFields.showEditor,
            selectedNote: null,
            editNote: false,
          }));
        }
      } else {
        const response = await fetch("http://localhost:3001/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: notesFields.title,
            label: getLable,
            color: getColor,
            date: currDate,
            creatBy: userFullName,
            textData: notesFields.noteText,
          }),
        });
        if (response.ok) {
          setNotesFields((prevData) => ({
            ...prevData,
            showEditor: !notesFields.showEditor,
          }));
        }
      }
      getNotesData();
    } catch (error) {
      console.error("Error adding/updating note", error);
    }
  };

  const deleteNote = async (id: string) => {
    const deleteResponse = await fetch(`http://localhost:3001/notes/${id}`, {
      method: "DELETE",
    });
    if (deleteResponse.ok) {
      const updatedNotes = notesFields.allNotes.filter(
        (note) => note.id !== id
      );
      setNotesFields((prevData) => ({
        ...prevData,
        updatedNotes,
        showEditor: !notesFields.showEditor,
      }));
    }
  };

  const deleteModal = (id: string) => {
    setNotesFields((prevData) => ({
      ...prevData,
      deletModal: true,
      noteId: id,
    }));
  };

  return (
    <>
      <section>
        <Container fluid>
          <Row>
            <Col className="note-haeder">
              <Header getName={getName} />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="notes-dashboard">
        <Container fluid>
          <Row className="notes-content">
            <Col className="col-lg-3 notes-content">
              <Form.Group className="search-input">
                <Form.Control
                  type="text"
                  name="search"
                  value={notesFields.searchNote}
                  placeholder="Search notes"
                  onChange={(e) =>
                    setNotesFields((prevData) => ({
                      ...prevData,
                      searchNote: e.target.value,
                    }))
                  }
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="search-icon"
                />
              </Form.Group>
              <div className="plus-icon">
                <p>MY NOTES</p>
                <span className="icon">
                  <FontAwesomeIcon icon={faPlus} onClick={handleIconClick} />
                </span>
              </div>
              <div className="notes">
                <div className="notes-cards">
                  {notesFields.allNotes &&
                    notesFields.allNotes.map((note: Notedata) => {
                      return (
                        <Card
                          key={note.id}
                          className="notes-card"
                          onClick={() => handleEditNote(note)}
                        >
                          <Card.Body
                            className={`${
                              notesFields.selectedNote?.id === note.id &&
                              "edit-border"
                            }`}
                          >
                            <Card.Title className="note-cards-title">
                              {note.title?.substring(0, 25)}...
                            </Card.Title>
                            <Card.Text>
                              {note.textData
                                ?.replace(/<[^>]+>/g, "")
                                .substring(0, 180)}{" "}
                              ....
                            </Card.Text>
                            <Card.Subtitle className="card-label-date">
                              <span
                                className="label-card"
                                style={{
                                  backgroundColor: note.color,
                                  color:
                                    note.label === "Blogging"
                                      ? "#cb9c81"
                                      : note.label === "Working"
                                      ? "#85d5d0"
                                      : note.label === "Personal"
                                      ? "#ae8ae7"
                                      : note.label === "Trading"
                                      ? "#4a169b"
                                      : note.label === "Technology"
                                      ? "#357827"
                                      : note.label === "Sports"
                                      ? "#838d4a"
                                      : note.label === "Travelling"
                                      ? "#114a11"
                                      : note.label === "Education"
                                      ? "#7c1c85"
                                      : note.label === "Finance"
                                      ? "#0664a1"
                                      : note.label === "Politics"
                                      ? "#c15d0f"
                                      : "",
                                }}
                              >
                                <FontAwesomeIcon icon={faArrowTrendUp} />
                                {note.label}
                              </span>
                              <span className="note-created-date">
                                {currDate === note.date ? (
                                  <p>Today</p>
                                ) : (
                                  note.date
                                )}
                              </span>
                            </Card.Subtitle>
                          </Card.Body>
                        </Card>
                      );
                    })}
                </div>
                <NoteSlider
                  notes={notesFields.allNotes}
                  handleEditNote={handleEditNote}
                  selectedNote={notesFields.selectedNote}
                  currDate={currDate}
                />
                {notesFields?.allNotes?.length === 0 && (
                  <h3 className="note-not-found">No notes found !!!</h3>
                )}
              </div>
            </Col>
            <Col className="col-lg-9 notes-editor">
              {notesFields.showEditor ? (
                <div>
                  <div className="note-title">
                    <div>
                      <div className="note-headings">
                        <h3>#</h3>
                        <LableDropdown
                          options={colorOptions}
                          setLabel={(label) =>
                            setNotesFields((prevdata) => ({
                              ...prevdata,
                              label,
                            }))
                          }
                          label={notesFields.label}
                          selectedNote={notesFields.selectedNote}
                        />
                        <h3>/</h3>
                        <div>
                          {notesFields.changeInput ? (
                            <Form.Control
                              type="text"
                              id="inputTitle"
                              aria-describedby="inputTitle"
                              placeholder="Write title"
                              value={notesFields.title || ""}
                              onChange={handleChangeInput}
                              onBlur={handleChangeText}
                            />
                          ) : (
                            <div onClick={handleChangeInput} className="title">
                              {notesFields.title}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="date-label">
                        <h6>{userFullName!}</h6>
                        <div className="time-lable">
                          <span>{currDate}</span>
                          <span>{currTime}</span>
                        </div>
                      </div>
                    </div>
                    {notesFields.selectedNote && (
                      <div
                        className="delete-icon"
                        onClick={() =>
                          deleteModal(notesFields?.selectedNote?.id!)
                        }
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </div>
                    )}
                  </div>
                  <div>
                    <TextEditor
                      setNoteText={(text) =>
                        setNotesFields((prevData) => ({
                          ...prevData,
                          noteText: text,
                        }))
                      }
                      noteText={notesFields.noteText}
                    />
                  </div>
                  <div className="note-save-btn">
                    <Button onClick={postNotesData}>Save</Button>
                  </div>
                </div>
              ) : notesFields.allNotes?.length === 0 ? (
                <div className="no-notes-msg">
                  <h3>No notes available !!!</h3>
                </div>
              ) : (
                <div className="no-notes-msg">
                  <h3>Please select note !!!</h3>
                </div>
              )}
              <DeleteModal
                deleteNote={deleteNote}
                setDeleteModal={(value) =>
                  setNotesFields((prevData) => ({
                    ...prevData,
                    deleteModal: value,
                  }))
                }
                noteId={notesFields.noteId}
                deletModal={notesFields.deletModal}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default NotesDashboard;
