import { render, screen } from '@testing-library/react';
import App from './App';

test('zeigt die Liste aller Beiträge', () => {
  render(<App />);
  expect(screen.getByText('Alle Beiträge')).toBeInTheDocument();
  expect(screen.getByText('Willkommen im CRA-Blog')).toBeInTheDocument();
});
