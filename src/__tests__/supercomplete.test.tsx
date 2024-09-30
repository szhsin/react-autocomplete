import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './utils/scrollIntoView';
import { Autocomplete } from './utils/Autocomplete';

describe('supercomplete', () => {
  test('continuous interactions', async () => {
    const user = userEvent.setup();
    render(<Autocomplete isSupercomplete />);
    const combobox = screen.getByRole<HTMLInputElement>('combobox');
    expect(combobox).toHaveAttribute('aria-autocomplete', 'both');

    await user.type(combobox, 'c');
    expect(screen.getByTestId('value')).toHaveTextContent(/^c$/);
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    expect(combobox).toHaveValue('california');
    expect(combobox.selectionStart).toBe(1);
    expect(combobox.selectionEnd).toBe(10);
    expect(screen.getByRole('option', { name: 'California' })).toHaveStyle({
      backgroundColor: 'red'
    });

    await user.keyboard('o');
    expect(screen.getByTestId('value')).toHaveTextContent(/^co$/);
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    expect(combobox).toHaveValue('colorado');
    expect(combobox.selectionStart).toBe(2);
    expect(combobox.selectionEnd).toBe(8);
    expect(screen.getByRole('option', { name: 'Colorado' })).toHaveStyle({
      backgroundColor: 'red'
    });

    await user.keyboard('z');
    expect(screen.getByTestId('value')).toHaveTextContent(/^coz$/);
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    expect(combobox).toHaveValue('coz');
    expect(combobox.selectionStart).toBe(3);
    expect(combobox.selectionEnd).toBe(3);
    expect(screen.queryAllByRole('option')).toHaveLength(0);

    await user.keyboard('{Backspace}');
    expect(screen.getByTestId('value')).toHaveTextContent(/^co$/);
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    expect(combobox).toHaveValue('co');
    expect(combobox.selectionStart).toBe(2);
    expect(combobox.selectionEnd).toBe(2);
    expect(screen.getByRole('option', { name: 'Colorado' })).toHaveStyle({
      backgroundColor: 'transparent'
    });

    await user.keyboard('{ArrowUp}');
    expect(screen.getByTestId('value')).toHaveTextContent(/^co$/);
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    expect(combobox).toHaveValue('Connecticut');
    expect(screen.getByRole('option', { name: 'Connecticut' })).toHaveStyle({
      backgroundColor: 'red'
    });

    await user.keyboard('{Enter}');
    expect(screen.getByTestId('value')).toHaveTextContent(/^Connecticut$/);
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Connecticut$/);
    expect(combobox).toHaveValue('Connecticut');
    expect(combobox).toHaveFocus();
    expect(screen.queryByRole('listbox')).toBeNull();
  });
});
