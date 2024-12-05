/**
 *    Name: Edale Miguel
 *    Date: December 2, 2024
 * 
 *    This file contains tests for the `FunZone` component, which fetches and displays jokes from an API.
 *    The tests mock the global `fetch` function to simulate different API responses, including success, failure, 
 *    and loading states. It ensures that the component displays the correct messages, handles errors, and updates 
 *    the joke when the button is clicked.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FunZone from '../FunZone';

// Mock the global fetch function
global.fetch = jest.fn();

describe('FunZone Component', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('displays loading message when fetching joke', async () => {
        // Mock a delayed API response
        fetch.mockResolvedValueOnce({
            json: () => new Promise((resolve) => setTimeout(() => resolve({ joke: 'Why did the programmer quit his job? Because he didn’t get arrays!' }), 500)),
        });

        render(<FunZone />);

        // Expect loading text to be shown initially
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    test('displays joke when the API request is successful', async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ joke: 'Why do programmers prefer dark mode? Because the light attracts bugs!' }),
        });

        render(<FunZone />);

        // Wait for the joke to appear
        await waitFor(() => expect(screen.getByText('Why do programmers prefer dark mode? Because the light attracts bugs!')).toBeInTheDocument());

        // Check if button is rendered
        expect(screen.getByRole('button', { name: /Get New Joke/i })).toBeInTheDocument();
    });

    test('displays error message when the API request fails', async () => {
        fetch.mockRejectedValueOnce(new Error('API failed'));

        render(<FunZone />);

        // Wait for the error message to appear
        await waitFor(() => expect(screen.getByText(/Failed to fetch a joke. Please try again later./i)).toBeInTheDocument());
    });

    test('fetches a new joke when the button is clicked', async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ joke: 'Why do Java developers wear glasses? Because they don’t see sharp!' }),
        });

        render(<FunZone />);

        // Wait for the joke to be displayed
        await waitFor(() => expect(screen.getByText('Why do Java developers wear glasses? Because they don’t see sharp!')).toBeInTheDocument());

        // Simulate clicking the button to fetch a new joke
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ joke: 'How many programmers does it take to change a light bulb? None. It’s a hardware problem.' }),
        });

        fireEvent.click(screen.getByRole('button', { name: /Get New Joke/i }));

        // Wait for the new joke to appear
        await waitFor(() => expect(screen.getByText('How many programmers does it take to change a light bulb? None. It’s a hardware problem.')).toBeInTheDocument());
    });
});