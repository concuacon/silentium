import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import PostDetail from '../src/screens/PostDetail';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockRoute = {
  params: { postId: 1 },
};

describe('PostDetail', () => {
  beforeEach(() => {
    mockedAxios.get.mockImplementation((url: string) => {
      if (url.includes('item/1.json')) {
        return Promise.resolve({
          data: {
            id: 1,
            title: 'Test Post',
            by: 'Author',
            score: 100,
            kids: [2, 3],
          },
        });
      }
      if (url.includes('item/2.json')) {
        return Promise.resolve({
          data: {
            id: 2,
            text: 'Comment 1',
            by: 'Commenter1',
          },
        });
      }
      if (url.includes('item/3.json')) {
        return Promise.resolve({
          data: {
            id: 3,
            text: 'Comment 2',
            by: 'Commenter2',
          },
        });
      }
      return Promise.reject(new Error('not found'));
    });
  });

  it('renders the PostDetail and displays post details', async () => {
    const { getByText } = render(<PostDetail route={mockRoute as any} />);
    
    await waitFor(() => {
      expect(getByText('Test Post')).toBeTruthy();
      expect(getByText('By: Author')).toBeTruthy();
      expect(getByText('Score: 100')).toBeTruthy();
    });
  });

  it('renders the comments', async () => {
    const { getByText } = render(<PostDetail route={mockRoute as any} />);
    
    await waitFor(() => {
      expect(getByText('Comment 1')).toBeTruthy();
      expect(getByText('Comment 2')).toBeTruthy();
    });
  });
});
