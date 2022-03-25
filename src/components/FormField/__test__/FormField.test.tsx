import { render, screen } from '@testing-library/react';
import FormField from '../FormField';

test('render place holder', () => {
    render(<FormField />);
    const placeholderEl = screen.getByLabelText(/Enter you task/);
    expect(placeholderEl).toBeInTheDocument();
});

test('render input', () => {
    render(<FormField />);
    const inputEl = screen.getByTestId('textField');
    expect(inputEl).toBeInTheDocument();
});

test('render button', () => {
    render(<FormField />);
    const buttonEl = screen.getByRole('button');
    expect(buttonEl.textContent).toBe('Add');
});

test('pass right value', () => {
    let str = '';

    const onClick = (value: string) => {
        str = value;
    };

    render(<FormField onAdd={onClick} />);
    const inputEl = screen.getByTestId('textField') as HTMLInputElement;
    const buttonEl = screen.getByRole('button');
    inputEl.value = 'testing';
    buttonEl.click();
    expect(inputEl.value).toBe(str);
});

test('clear value when invoke callback()', () => {

    const onClick = (value: string, callback: Function) => {
        callback();
    };

    render(<FormField onAdd={onClick} />);
    const inputEl = screen.getByTestId('textField') as HTMLInputElement;
    const buttonEl = screen.getByRole('button');
    inputEl.value = 'testing';
    buttonEl.click();
    expect(inputEl.value).toBe('');
});

