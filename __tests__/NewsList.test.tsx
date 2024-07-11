import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import NewsList from '../src/screens/NewsList';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const navigation = { navigate: jest.fn() };

describe('NewsList', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [1, 2, 3], // Mock list of story IDs
    });
    mockedAxios.get.mockImplementation((url: string) => {
      if (url.includes('item/1.json')) {
        return Promise.resolve({
          data: {
            id: 1,
            title: 'Story 1',
          },
        });
      }
      if (url.includes('item/2.json')) {
        return Promise.resolve({
          data: {
            id: 2,
            title: 'Story 2',
          },
        });
      }
      if (url.includes('item/3.json')) {
        return Promise.resolve({
          data: {
            id: 3,
            title: 'Story 3',
          },
        });
      }
      return Promise.reject(new Error('not found'));
    });
  });

  it('renders the NewsList and displays stories', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <NewsList navigation={navigation as any} />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText('Story 1')).toBeTruthy();
      expect(getByText('Story 2')).toBeTruthy();
      expect(getByText('Story 3')).toBeTruthy();
    });
  });
});
