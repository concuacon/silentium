import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import HTMLView from 'react-native-htmlview';

import { Comment, fetchComments, fetchPostDetail, Post } from '../utils/apiClient';
import { DetailScreenProps } from '../utils/types';

const PostDetail: React.FC<DetailScreenProps> = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // Fetch post details
        const postData = await fetchPostDetail(postId); 
        // Set post state
        setPost(postData);

        // Fetch comments if there are any
        if (postData.kids && postData.kids.length > 0) {
          const commentData = await fetchComments(postData);
          setComments(commentData);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching post and comments:', error);
        setError('Failed to fetch post and comments');
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  const _renderItem = ({item}: {item: Comment}) => {
    return (
    <View style={styles.commentContainer}>
      <HTMLView value={item.text} />
      <Text style={styles.commentAuthor}>By: {item.by}</Text>
    </View>
    );
  }

  return (
    <View style={styles.container}>
      {post && (
        <View style={styles.postContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.author}>By: {post.by}</Text>
          <Text style={styles.score}>Score: {post.score}</Text>
          <Text style={styles.descendants}>Comments: {post.descendants}</Text>
        </View>
      )}
      <FlatList
        data={comments}
        keyExtractor={(item: { id: { toString: () => any; }; }, index: number) => `${item.id}-${index}`}
        renderItem={_renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: 'gray',
  },
  score: {
    fontSize: 14,
    color: 'green',
  },
  descendants: {
    fontSize: 14,
    color: 'blue',
  },
  commentContainer: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  commentText: {
    fontSize: 16,
  },
  commentAuthor: {
    fontSize: 12,
    color: 'gray',
  },
});

export default PostDetail;
