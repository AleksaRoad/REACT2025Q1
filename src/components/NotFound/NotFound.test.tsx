import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

import { ERROR_MESSAGES } from '@/shared';

import { NotFound } from './NotFound';

const mockedNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('NotFound', () => {
  it('should render the 404 image, error message, and Home button', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const image = screen.getByRole('img', { name: /404/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'assets/images/404.webp');

    const errorMessage = screen.getByText(ERROR_MESSAGES.NOT_FOUND);
    expect(errorMessage).toBeInTheDocument();

    const homeButton = screen.getByRole('button', { name: /Home/i });
    expect(homeButton).toBeInTheDocument();
  });

  it('should navigate to the home page when the Home button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(mockedNavigate).not.toHaveBeenCalled();

    const homeButton = screen.getByRole('button', { name: /Home/i });
    await user.click(homeButton);

    expect(mockedNavigate).toHaveBeenCalledWith('/', { replace: true });
  });
});
