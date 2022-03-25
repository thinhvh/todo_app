import { Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FormField from '../components/FormField/FormField';
import TaskList from '../components/TaskList/TaskList';
import { NORMAL_SUCCESSFUL_STATUS, POST_SUCCESSFUL_STATUS } from '../consts/response-status';
import { Task } from '../models/task.model';
import styles from './Todo.module.css';


const Todo: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('todos') || '[]');
        setTasks(data);
    }, []);

    const syncDataLocalStorage = (newTasks: Task[]) => {
        localStorage.setItem('todos', JSON.stringify(newTasks));
    }

    const onPatch = async (
        task: Task,
        { body, beforeRequestObj, afterRequestObj }:
            { body: Partial<Task>, beforeRequestObj: Partial<Task>, afterRequestObj: Partial<Task> }
    ) => {
        let newTask = new Task({ ...task, ...beforeRequestObj });
        const updateTask = (prevTasks: Task[]) => {
            const newTasks = prevTasks.map(task => task.id === newTask.id ? newTask : task);
            return newTasks;
        }
        setTasks(updateTask);
        const result = await axios.patch(`todos/${task.id}`, { ...body });
        if (result.status !== NORMAL_SUCCESSFUL_STATUS) alert('something went wrong' + JSON.stringify(result.status));

        newTask = {
            ...newTask,
            ...body,
            ...afterRequestObj
        }
        setTasks(prevTasks => {
            const newTasks = updateTask(prevTasks);
            syncDataLocalStorage(newTasks);
            return newTasks;
        });

    }

    const onMarkComplete = async (task: Task, checked: boolean) => {
        await onPatch(task, {
            body: { isCompleted: checked },
            beforeRequestObj: { isCheckingComplete: true },
            afterRequestObj: { isCheckingComplete: false },
        });
    }

    const onDelete = async (task: Task) => {
        const result = await axios.delete(`todos/${task.id}`)
        if (result.status !== NORMAL_SUCCESSFUL_STATUS) alert('something went wrong' + JSON.stringify(result.status));

        const deletedIndex = tasks.findIndex(currentTask => currentTask.id === task.id);
        tasks.splice(deletedIndex, 1);
        setTasks([...tasks]);
        syncDataLocalStorage(tasks);
    }

    const onAdd = async (title: string, callback: Function) => {
        const result = await axios.post('todos', new Task({ title }));
        if (result.status !== POST_SUCCESSFUL_STATUS) alert('something went wrong' + JSON.stringify(result.status));

        setTasks(prevTasks => {
            const newTasks = [result.data, ...prevTasks];
            syncDataLocalStorage(newTasks);
            return newTasks;
        });
        callback();
    };

    const onEdit = async (task: Task, newTitle: string) => {
        await onPatch(task, {
            body: { title: newTitle },
            beforeRequestObj: { isEditing: true },
            afterRequestObj: { isEditing: false }
        })
    }

    return (
        <div className={styles.container}>
            <Typography classes={{ root: styles.header }} variant="h5">Todo List</Typography>
            <div className={styles.inputRow}>
                <FormField onAdd={onAdd} />
            </div>
            <TaskList
                tasks={tasks}
                onMarkComplete={onMarkComplete}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        </div>
    )
}

export default Todo;