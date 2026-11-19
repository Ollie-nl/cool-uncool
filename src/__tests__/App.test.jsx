import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';
import App from '../App';

beforeEach(() => {
  window.history.replaceState(null, '', '/');
});

test('Starts in the latest available month', async () => {
  const fetchMock = vi.fn(async (url) => ({
    ok: true,
    json: async () =>
      url.endsWith('available-months.json')
        ? { months: ['2024-12', '2026-07', '2025-11'] }
        : {
            slides: [
              { type: 'heading', slug: 'start', content: 'July slides' },
            ],
          },
  }));
  vi.stubGlobal('fetch', fetchMock);

  render(<App />);

  expect(
    await screen.findByRole('heading', { name: 'July slides' })
  ).toBeVisible();
  expect(window.location.pathname).toBe('/slides/2026/07/start');
  expect(fetchMock).toHaveBeenCalledWith('/data/slides-2026-07.json');
});

test('Falls back to the default month when the month index is unavailable', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url) => ({
      ok: !url.endsWith('available-months.json'),
      json: async () => ({
        slides: [
          { type: 'heading', slug: 'start', content: 'December slides' },
        ],
      }),
    }))
  );
  vi.spyOn(console, 'error').mockImplementation(() => {});

  render(<App />);

  expect(
    await screen.findByRole('heading', { name: 'December slides' })
  ).toBeVisible();
  await waitFor(() =>
    expect(window.location.pathname).toBe('/slides/2024/12/start')
  );
});

test('Shows an unknown route', () => {
  window.history.replaceState(null, '', '/unknown');
  render(<App />);
  expect(screen.getByText('Route niet gevonden: /unknown')).toBeVisible();
});
