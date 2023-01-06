import "./../../App.css";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from "react";
import { ContentCopy } from "@mui/icons-material";
import EditDialog from "../Form/EditDialog";

function ToDoCard({ todo, deleteTodo, duplicateTodo, editTodo, updateTodo }) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const onDelete = () => {
    setOpen(false);
    deleteTodo(todo);
  };

  const onEdit = () => {
    setOpenEdit(true);
  };

  const handleDone = () => {
    if (todo.state == "open") {
      updateTodo({ ...todo, state: "done" });
    } else {
      updateTodo({ ...todo, state: "open" });
    }
  };

  return (
    <div>
      <Card
        className="card"
        variant="outlined"
        sx={{
          borderRight: "solid",
          borderRightColor: todo.color,
          borderRightWidth: "16px",
        }}
      >
        <CardContent>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={todo.state === "done"}
                  defaultChecked={todo.state === "done"}
                  onClick={handleDone}
                />
              }
              label="Done"
            />
          </FormGroup>
          <Typography gutterBottom variant="h5" component="div">
            {todo.title.toUpperCase()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {todo.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {"Priorität: " + todo.priority}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size={"small"}
            onClick={() => setOpen(true)}
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
          <Button
            size={"small"}
            onClick={() => duplicateTodo(todo)}
            color="primary"
            variant="outlined"
            startIcon={<ContentCopy />}
          >
            Duplicate
          </Button>
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Willst du die ToDo Karte wirklich löschen"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={onDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <EditDialog
        open={openEdit}
        todo={todo}
        setOpen={setOpenEdit}
        triggerUpdateTodo={updateTodo}
      />
    </div>
  );
}

export default ToDoCard;
