import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
  timeout: 10000, // Thiết lập timeout (tùy chọn)
});

// Định nghĩa kiểu dữ liệu cho response
interface Story {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
}

interface Comment {
  id: number;
  text: string;
  by: string;
  time: number;
}

interface Post {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  time: number;
  descendants: number;
  kids?: number[]; // Optional field for comments
}

const PAGE_SIZE = 10;

const fetchStories = async (page: number): Promise<Story[]> => {
  try {
    const [topStoryIds, newStoryIds, bestStoryIds] = await Promise.all([
      apiClient.get<number[]>('/topstories.json'),
      apiClient.get<number[]>('/newstories.json'),
      apiClient.get<number[]>('/beststories.json'),
    ]);

    const allStoryIds = [
      ...topStoryIds.data,
      ...newStoryIds.data,
      ...bestStoryIds.data,
    ];

    const uniqueStoryIds = Array.from(new Set(allStoryIds)); // Loại bỏ các ID trùng lặp

    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const storyIdsSlice = uniqueStoryIds.slice(start, end);

    const storyPromises = storyIdsSlice.map(id => apiClient.get<Story>(`/item/${id}.json`));
    const storyResponses = await Promise.all(storyPromises);

    return storyResponses.map(response => response.data);
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
};


const fetchPostDetail = async (postId: number): Promise<Post> => {
  try {
    // Fetch post details
    const postResponse = await apiClient.get<Post>(`/item/${postId}.json`);
    const postData = postResponse.data;
    return postData;
  } catch (error) {
    console.error('Error fetching post detail:', error);
    throw error;
  }
};

const fetchComments = async (postData: Post): Promise<Comment[]> => {
  try {

    // Fetch comments if there are any
    let commentData: Comment[] = [];
    if (postData.kids && postData.kids.length > 0) {
      const commentPromises = postData.kids.map(id => apiClient.get<Comment>(`/item/${id}.json`));
      const commentResponses = await Promise.all(commentPromises);
      commentData = commentResponses.map(response => response.data);
    }

    return commentData;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};


export { fetchStories, fetchComments, fetchPostDetail };  
export type { Story, Comment, Post };

