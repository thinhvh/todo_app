import { Button, TextField } from "@mui/material";
import { useRef } from "react";

interface FormFieldProps {
    onAdd?: (value: string, callback: Function) => void;
}

const FormField: React.FC<FormFieldProps> = ({ onAdd = () => { } }) => {
    const ref = useRef<HTMLInputElement>();

    const onAddTask = () => {
        const inputEl = ref.current as HTMLInputElement;
        const resetValue = () => {
            inputEl.value = '';
        };
        onAdd(inputEl.value, resetValue);
    }

    return (
        <>
            <TextField
                label="Enter you task"
                variant="outlined"
                size="small"
                inputRef={ref}
                inputProps={{ 'data-testid': 'textField' }}
            />
            <Button variant="contained" onClick={onAddTask}>Add</Button>
        </>
    )
}

export default FormField;