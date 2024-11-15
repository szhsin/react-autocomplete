import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import './utils/scrollIntoView';
import { MultiSelect } from './utils/MultiSelect';

describe('multiSelect', () => {
  test('continuous interactions', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<MultiSelect />);
    const combobox = screen.getByRole('combobox');
    const inputWrapper = screen.getByTestId('input-wrapper');
    expect(inputWrapper).toHaveStyle({ borderColor: 'white' });

    // Select multiple items with mouse and keyboard
    await user.click(combobox);
    await user.click(screen.getByRole('option', { name: 'Alaska' }));
    await user.keyboard('{ArrowDown>2/}{Enter}');
    await user.keyboard('{ArrowDown>2/}{Enter}'); // select the same item again will not flip select
    await user.keyboard('c{ArrowUp>2/}{Enter}');
    let selected = screen.getAllByTestId('selected');
    expect(selected).toHaveLength(3);
    expect(selected[0]).toHaveTextContent(/^Alaska$/);
    expect(selected[1]).toHaveTextContent(/^Alabama$/);
    expect(selected[2]).toHaveTextContent(/^Colorado$/);
    expect(screen.getByTestId('value')).toBeEmptyDOMElement();
    expect(inputWrapper).toHaveStyle({ borderColor: 'red' });

    // Remove one item by clicking it
    await user.click(screen.getByRole('button', { name: 'Alabama' }));
    selected = screen.getAllByTestId('selected');
    expect(selected).toHaveLength(2);
    expect(selected[0]).toHaveTextContent(/^Alaska$/);
    expect(selected[1]).toHaveTextContent(/^Colorado$/);

    // Remove items by Backspace
    await user.keyboard('c{Backspace>2/}');
    selected = screen.getAllByTestId('selected');
    expect(selected).toHaveLength(1);
    expect(selected[0]).toHaveTextContent(/^Alaska$/);
    await user.keyboard('{Backspace}');
    selected = screen.queryAllByTestId('selected');
    expect(selected).toHaveLength(0);
    await user.keyboard('{Backspace>2/}');
    selected = screen.queryAllByTestId('selected');
    expect(selected).toHaveLength(0);

    // Clicking a selected item will focus input
    await user.keyboard('{ArrowDown}{Enter}{ArrowDown>3/}{Enter}{ArrowDown>4/}{Enter}');
    await user.click(screen.getByTestId('value'));
    expect(combobox).not.toHaveFocus();
    expect(inputWrapper).toHaveStyle({ borderColor: 'white' });
    expect(screen.getAllByTestId('selected')).toHaveLength(3);
    await user.click(screen.getByRole('button', { name: 'Alabama' }));
    expect(combobox).toHaveFocus();
    expect(inputWrapper).toHaveStyle({ borderColor: 'red' });
    expect(screen.getAllByTestId('selected')).toHaveLength(2);

    // Clicking a selected item will keep list open and input focused
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Arizona' }));
    expect(combobox).toHaveFocus();
    expect(inputWrapper).toHaveStyle({ borderColor: 'red' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByTestId('selected')).toHaveLength(1);

    // Open and close with toggle
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('listbox')).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    /* { closeOnSelect: false, flipOnSelect: true } */
    rerender(<MultiSelect closeOnSelect={false} flipOnSelect />);
    await user.keyboard('c{ArrowUp}{Enter}');
    selected = screen.getAllByTestId('selected');
    expect(selected).toHaveLength(2);
    expect(selected[0]).toHaveTextContent(/^Alaska$/);
    expect(selected[1]).toHaveTextContent(/^Connecticut$/);
    await user.keyboard('{ArrowUp}{Enter}');
    selected = screen.getAllByTestId('selected');
    expect(selected).toHaveLength(1);
    expect(selected[0]).toHaveTextContent(/^Alaska$/);
    expect(screen.getByTestId('value')).toHaveTextContent(/^c$/);
  });
});
