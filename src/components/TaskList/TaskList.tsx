import { Fragment } from "react";
import { Task } from "../../models/task.model";
import TaskItem, { TaskItemAction } from "./TaskItem/TaskItem";

interface TaskListProps extends TaskItemAction {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onMarkComplete = () => { }, onDelete = () => { }, onEdit = () => { } }) => {
    return (
        <div>
            {tasks.map((task) => (
                <Fragment key={task.id}>
                    <TaskItem task={task} onMarkComplete={onMarkComplete} onDelete={onDelete} onEdit={onEdit} />
                </Fragment>
            ))}
        </div>
    )
}

export default TaskList;