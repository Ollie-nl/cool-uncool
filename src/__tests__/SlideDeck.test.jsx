import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { beforeEach, expect, test, vi } from 'vitest';
import SlideDeck from '../components/SlideDeck';

const slides = [
  { type: 'heading', slug: 'start', content: 'Start Slide' },
  { type: 'heading', slug: 'next', content: 'Next Slide' },
];

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url) => ({
      ok: true,
      json: async () =>
        url.endsWith('available-months.json')
          ? { months: ['2024-12', '2024-10'] }
          : { slides },
    }))
  );
});

function DeckRoute() {
  const location = useLocation();
  return (
    <>
      <output data-testid="location">{location.pathname}</output>
      <SlideDeck />
    </>
  );
}

function renderDeck(path = '/slides/2024/12/start') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/slides/:year/:month/:slug" element={<DeckRoute />} />
      </Routes>
    </MemoryRouter>
  );
}

test('Loads slides and navigates forward and back with arrow keys', async () => {
  renderDeck();
  expect(
    await screen.findByRole('heading', { name: 'Start Slide' })
  ).toBeVisible();
  expect(screen.getByText('Nog 1 slide te gaan')).toBeVisible();

  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(
    await screen.findByRole('heading', { name: 'Next Slide' })
  ).toBeVisible();
  expect(screen.getByTestId('location')).toHaveTextContent(
    '/slides/2024/12/next'
  );
  expect(screen.getByText('Dit is de laatste slide')).toBeVisible();

  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(
    await screen.findByRole('heading', { name: 'Start Slide' })
  ).toBeVisible();
  expect(screen.getByTestId('location')).toHaveTextContent(
    '/slides/2024/12/start'
  );
});

test('Loads a deep link and changes months', async () => {
  renderDeck('/slides/2024/12/next');
  expect(
    await screen.findByRole('heading', { name: 'Next Slide' })
  ).toBeVisible();
  await screen.findByRole('option', { name: '2024 Oktober' });

  fireEvent.change(screen.getByRole('combobox'), {
    target: { value: '2024-10' },
  });
  await waitFor(() =>
    expect(screen.getByTestId('location')).toHaveTextContent(
      '/slides/2024/10/start'
    )
  );
  expect(
    await screen.findByRole('heading', { name: 'Start Slide' })
  ).toBeVisible();
  expect(fetch).toHaveBeenCalledWith('/data/slides-2024-10.json');
});

test('Shows an empty state when slides cannot be loaded', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({ ok: false }))
  );
  vi.spyOn(console, 'error').mockImplementation(() => {});
  renderDeck();
  await waitFor(() => expect(console.error).toHaveBeenCalled());
  expect(screen.getByText('Geen slides beschikbaar.')).toBeVisible();
});
