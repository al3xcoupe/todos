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

function AddDialog({ open, setOpen, newObject, setNewObject, triggerTodo }) {
  const [color, setColor] = useState("");

  const handleColor = (color) => {
    setColor(color.hex);
    setNewObject({ ...newObject, color: color.hex });
  };

  const handleSubmit = () => {
    setOpen(false);
    triggerTodo();
  };

  const closeAddDialog = () => {
    setOpen(false);
    setNewObject({
      id: "",
      title: "",
      description: "",
      priority: undefined,
      color: "",
    });
  };

  return (
    <div>
      <Dialog open={open} onClose={() => closeAddDialog()}>
        <DialogTitle>Add New ToDo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new ToDo Card about what you need to do in the future.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            onChange={(e) =>
              setNewObject({ ...newObject, title: e.target.value })
            }
            fullWidth
            variant="outlined"
          />

          <TextField
            autoFocus
            margin="dense"
            id="duration"
            label="Description"
            type="text"
            onChange={(e) =>
              setNewObject({ ...newObject, description: e.target.value })
            }
            fullWidth
            variant="outlined"
          />

          <FormControl style={{ marginTop: "8px" }} fullWidth>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              label="Priority"
              onChange={(e) =>
                setNewObject({ ...newObject, priority: e.target.value })
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
            <p>Choose Color for ToDo Card (Default White)</p>
            <div style={{ float: "left", marginRight: "20px" }}>
              <TwitterPicker onChange={(e) => handleColor(e)} />
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
                backgroundColor: color,
              }}
            ></div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Add ToDo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddDialog;
