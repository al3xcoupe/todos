import "./../../App.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { TwitterPicker } from "react-color";
import { priorities } from "../../App";

function EditDialog({ open, setOpen, todo, triggerUpdateTodo }) {
  const [editObject, setEditObject] = useState({
    id: todo.id,
    title: todo.title,
    description: todo.description,
    priority: todo.priority,
    color: todo.color,
  });

  const handleSubmit = () => {
    setOpen(false);
    console.log(editObject);
    triggerUpdateTodo(editObject);
  };

  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit ToDo</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit this ToDo Card</DialogContentText>
          <TextField
            value={editObject.title}
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) =>
              setEditObject({ ...editObject, title: e.target.value })
            }
          />

          <TextField
            value={editObject.description}
            autoFocus
            margin="dense"
            id="duration"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) =>
              setEditObject({ ...editObject, description: e.target.value })
            }
          />

          <FormControl style={{ marginTop: "8px" }} fullWidth>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              value={editObject.priority}
              label="Priority"
              onChange={(e) =>
                setEditObject({ ...editObject, priority: e.target.value })
              }
            >
              {priorities.map((x, index) => (
                <MenuItem key={index} value={x}>
                  {x}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div style={{ overflow: "hidden" }}>
            <p>Choose Color for ToDo Card</p>
            <div style={{ float: "left", marginRight: "20px" }}>
              <TwitterPicker
                onChange={(e) => setEditObject({ ...editObject, color: e.hex })}
              />
            </div>
            <div
              style={{
                marginLeft: "10px",
                overflow: "hidden",
                border: "solid",
                borderColor: "grey",
                borderWidth: "0.5px",
                borderRadius: "5px",
                width: "50px",
                height: "50px",
                backgroundColor: editObject.color,
              }}
            ></div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Update ToDo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditDialog;
