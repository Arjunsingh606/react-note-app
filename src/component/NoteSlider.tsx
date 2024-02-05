import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { Card} from "react-bootstrap";
import { Notedata } from "../interface/Interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowTrendUp} from "@fortawesome/free-solid-svg-icons";

interface NoteSliderProps {
  notes: Notedata[];
  handleEditNote: (note: Notedata) => void;
  selectedNote: Notedata | null;
  currDate: string;
}

const NoteSlider: React.FC<NoteSliderProps> = ({
  notes,
  handleEditNote,
  selectedNote,
  currDate,
}) => {
  return (
    <div className="slider-notes">
      <AwesomeSlider>
        {notes &&
          notes.map((note: Notedata) => {
            return (
              <Card
                key={note.id}
                className="notes-card"
                onClick={() => handleEditNote(note)}
              >
                <Card.Body
                  className={`${selectedNote?.id === note.id && "edit-border"}`}
                >
                  <Card.Title className="note-cards-title">
                    {note.title?.substring(0, 25)}...
                  </Card.Title>
                  <Card.Text>
                    {note.textData?.replace(/<[^>]+>/g, "").substring(0, 180)}{" "}
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
                      {currDate === note.date ? <p>Today</p> : note.date}
                    </span>
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            );
          })}
      </AwesomeSlider>
    </div>
  );
};

export default NoteSlider;
