import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../components/demoHome';

test('renders Home component with loading spinner initially', () => {
  render(<Home />);
  const spinner = screen.getByTestId('loading-spinner');
  expect(spinner).toBeInTheDocument();
});

test('renders Home component with packages after data fetching', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => [{ _id: '1', package_name: 'Package 1', package_days: 5, package_price: 500 }],
    ok: true,
  });

  render(
    <Router>
      <Home />
    </Router>
  );
  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).toBeNull();
  });
  const packageName = screen.getByText('Package 1');
  expect(packageName).toBeInTheDocument();
});

test('renders Home component with filtered packages', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: async () => [
      { _id: '1', package_name: 'Package 1', package_days: 5, package_price: 500 },
      { _id: '2', package_name: 'Package 2', package_days: 3, package_price: 300 },
    ],
    ok: true,
  });

  render(
    <Router>
      <Home />
    </Router>
  );

  await waitFor(() => {
    expect(screen.queryByTestId('loading-spinner')).toBeNull();
  });

  const searchInput = screen.getByPlaceholderText('Search packages...');
  fireEvent.change(searchInput, { target: { value: 'Package 2' } });

  const packageName = screen.getByText('Package 2');
  expect(packageName).toBeInTheDocument();
});
