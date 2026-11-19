import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Slide from '../components/Slide';

test('Renders Slide component with content', () => {
  const slideData = {
    type: 'heading',
    content: '🚀 Cool Uncool Test Slide',
    slug: 'test-slide',
  };

  render(<Slide slide={slideData} isActive={true} />);

  expect(screen.getByText(/Cool Uncool Test Slide/i)).toBeInTheDocument();
});

test('Renders Markdown and lazily loads local and external images', () => {
  render(
    <Slide
      isActive
      slide={{
        type: 'paragraph',
        title: 'Images',
        content:
          '**Bold** ![Local](/images/test.png) ![Remote](https://example.com/test.png)',
      }}
    />
  );

  expect(screen.getByText('Bold').tagName).toBe('STRONG');
  expect(screen.getByAltText('Local')).toHaveAttribute(
    'src',
    '/images/test.png'
  );
  expect(screen.getByAltText('Local')).toHaveAttribute('loading', 'lazy');
  expect(screen.getByAltText('Remote')).toHaveAttribute(
    'src',
    'https://example.com/test.png'
  );
});

test('Embeds YouTube with looping and visible controls', () => {
  render(
    <Slide
      isActive
      slide={{
        type: 'youtube',
        title: 'Video',
        url: 'https://youtu.be/dQw4w9WgXcQ',
      }}
    />
  );
  const iframe = screen.getByTitle('Video');
  const url = new URL(iframe.src);

  expect(url.hostname).toBe('www.youtube-nocookie.com');
  expect(url.pathname).toBe('/embed/dQw4w9WgXcQ');
  expect(url.searchParams.get('loop')).toBe('1');
  expect(url.searchParams.get('playlist')).toBe('dQw4w9WgXcQ');
  expect(url.searchParams.get('controls')).toBe('1');
  expect(iframe).toHaveAttribute('loading', 'lazy');
});
