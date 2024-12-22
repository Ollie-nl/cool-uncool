import { render, screen, fireEvent } from '@testing-library/react';
import DarkModeToggle from '../components/DarkModeToggle/DarkModeToggle';

test('Toggles dark mode on button click', () => {
  const toggleMock = jest.fn();
  
  render(<DarkModeToggle isDarkMode={false} onToggle={toggleMock} />);
  
  const button = screen.getByRole('button');
  fireEvent.click(button);
  
  expect(toggleMock).toHaveBeenCalledTimes(1);
});
