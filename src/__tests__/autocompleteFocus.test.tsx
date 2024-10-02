import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Autocomplete } from './utils/Autocomplete';
import './utils/scrollIntoView';

describe('autocompleteFocus', () => {
  test('continuous interactions', async () => {
    const user = userEvent.setup();
    render(<Autocomplete isAutoFocus />);
    const combobox = screen.getByRole('combobox');

    await user.type(combobox, 'c');
    expect(screen.getByTestId('value')).toHaveTextContent(/^c$/);
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    expect(combobox).toHaveValue('c');
    expect(screen.getByRole('option', { name: 'California' })).toHaveStyle({
      backgroundColor: 'red'
    });

    await user.keyboard('{Backspace}');
    expect(screen.getByRole('option', { name: 'California' })).toHaveStyle({
      backgroundColor: 'transparent'
    });

    await user.keyboard('co');
    expect(screen.getByTestId('value')).toHaveTextContent(/^co$/);
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    expect(combobox).toHaveValue('co');
    expect(screen.getByRole('option', { name: 'Colorado' })).toHaveStyle({
      backgroundColor: 'red'
    });

    await user.keyboard('z');
    expect(screen.getByTestId('value')).toHaveTextContent(/^coz$/);
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    expect(combobox).toHaveValue('coz');
    expect(screen.queryAllByRole('option')).toHaveLength(0);

    await user.keyboard('{Backspace}');
    expect(screen.getByTestId('value')).toHaveTextContent(/^co$/);
    expect(screen.getByTestId('selected')).toBeEmptyDOMElement();
    expect(combobox).toHaveValue('co');
    expect(screen.getByRole('option', { name: 'Colorado' })).toHaveStyle({
      backgroundColor: 'red'
    });

    await user.keyboard('{Enter}');
    expect(screen.getByTestId('value')).toHaveTextContent(/^Colorado$/);
    expect(screen.getByTestId('selected')).toHaveTextContent(/^Colorado$/);
    expect(combobox).toHaveValue('Colorado');
    expect(combobox).toHaveFocus();
    expect(screen.queryByRole('listbox')).toBeNull();
  });
});
