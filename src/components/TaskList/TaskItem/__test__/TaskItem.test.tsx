import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Task } from '../../../../models/task.model';
import TaskItem from '../TaskItem';

test('render task title', () => {
    const title = 'testing'
    const task = new Task({ title });
    render(<TaskItem task={task} />);
    const titleEl = screen.getByText(title);
    expect(titleEl).toBeInTheDocument();
});

test('render delete icon & click on delete icon & 2 options in confirm dialog', async () => {
    let times = 0;
    const task = new Task();
    const onDelete = () => {
        times++;
    }

    render(<TaskItem task={task} onDelete={onDelete} />);
    const deleteEl = screen.getByTestId('delete-icon');
    expect(deleteEl).toBeInTheDocument();

    fireEvent.click(deleteEl);
    const dialogEl = screen.getByTestId('confirm-dialog');
    const yesOptionEl = screen.getByTestId('yes-option');
    let noOptionEl = screen.getByTestId('no-option');
    expect(dialogEl).toBeInTheDocument();
    expect(yesOptionEl).toBeInTheDocument();
    expect(noOptionEl).toBeInTheDocument();


    yesOptionEl.click();
    expect(times).toBe(1);
    await waitFor(async () => {
        expect(dialogEl).not.toBeInTheDocument();
    });

    fireEvent.click(deleteEl);
    noOptionEl = screen.getByTestId('no-option');

    noOptionEl.click();
    expect(times).toBe(1);
    await waitFor(async () => {
        expect(dialogEl).not.toBeInTheDocument();
    });
});

test('render edit icon', () => {
    const task = new Task();
    render(<TaskItem task={task} />);
    const editEl = screen.getByTestId('edit-icon');
    expect(editEl).toBeInTheDocument();
    fireEvent.click(editEl);
    const editField = screen.getByTestId('edit-field');
    expect(editField).toBeInTheDocument();
});

test('render checkbox', () => {
    const task = new Task();
    render(<TaskItem task={task} />);
    const checkboxEl = screen.getByTestId('checkbox');
    expect(checkboxEl).toBeInTheDocument();
});

