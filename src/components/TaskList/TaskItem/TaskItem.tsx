import { Task } from "../../../models/task.model";
import { Delete, Edit, Check, DoDisturb } from '@mui/icons-material';
import styled from '@emotion/styled'
import { Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export interface TaskItemAction {
    onMarkComplete?: (task: Task, checked: boolean) => void;
    onDelete?: (task: Task) => void;
    onEdit?: (task: Task, title: string) => void;
}

interface TaskItemProps extends TaskItemAction {
    task: Task;
}

const TaskContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 56px;
`

const TaskContent = styled.div`
    text-decoration: ${props => props.inlist === 'true' ? 'line-through' : 'unset'};
    max-width: 240px;
    word-break: break-word;
`

const ActionContainer = styled.div`
    display: flex;
    align-items: center;
    & > * {
        cursor: pointer;
        &:hover {
            transform: scale(1.2)
        }
    }
`

const TaskItem: React.FC<TaskItemProps> = ({ task, onMarkComplete = () => { }, onDelete = () => { }, onEdit = () => { } }) => {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const ref = useRef<HTMLInputElement>();

    useEffect(() => {
        if (editing) {
            const inputEl = ref.current as HTMLInputElement;
            inputEl.value = task.title;
        }
    }, [editing, task]);

    const handleDelete = () => {
        setOpen(true);
    };

    const handleClose = (isAgree: boolean) => {
        setOpen(false);
        if (isAgree) {
            onDelete(task)
        }
    };

    const onChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        onMarkComplete(task, event.target.checked)
    };

    const showEdit = (isShow: boolean) => {
        setEditing(isShow);
    };

    const handleEdit = () => {
        const inputEl = ref.current as HTMLInputElement;
        showEdit(false);
        onEdit(task, inputEl.value);
    }

    return (
        <TaskContainer>
            {editing
                ? <TextField data-testid="edit-field" variant="standard" size="small" inputRef={ref} />
                : <TaskContent inlist={String(task.isCompleted)}>{task.title}</TaskContent>
            }
            <ActionContainer>
                {task.isCheckingComplete
                    ? <CircularProgress size={20} style={{ padding: "8px" }} />
                    : <Checkbox data-testid="checkbox" size="small" checked={task.isCompleted} onChange={onChangeCheckbox} />
                }
                <Delete data-testid="delete-icon" onClick={handleDelete} />
                {editing
                    ? <><Check onClick={handleEdit} /><DoDisturb onClick={() => showEdit(false)} /></>
                    : task.isEditing
                        ? <CircularProgress size={20} style={{ padding: "8px" }} />
                        : <Edit data-testid="edit-icon" onClick={() => showEdit(true)} />
                }
            </ActionContainer>
            <Dialog
                open={open}
                onClose={() => handleClose(false)}
                data-testid="confirm-dialog"
            >
                <DialogContent>
                    <DialogContentText>
                        Are you sure want to delete ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button data-testid="yes-option" onClick={() => handleClose(true)}>Yes</Button>
                    <Button data-testid="no-option" onClick={() => handleClose(false)}>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </TaskContainer>
    )
}

export default TaskItem;