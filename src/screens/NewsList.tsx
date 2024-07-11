import React, { useEffect, useState, useCallback } from 'react';
import { Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

import { fetchStories, Story } from '../utils/apiClient';
import { NewsListScreenProps } from '../utils/types';
import NewCard from '../components/NewCard';

const NewsList: React.FC<NewsListScreenProps> = ({navigation}) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadStories = useCallback(async (page: number, append: boolean = false) => {
    try {
      const newStories = await fetchStories(page);
      setStories(prevStories => (append ? [...prevStories, ...newStories] : newStories));
      setPage(page);
    } catch (error: unknown) {  
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadStories(1);
  }, [loadStories]);

  const handleLoadMore = () => {
    if (!loading) {
      loadStories(page + 1, true);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadStories(1);
  };

  if (loading && !isRefreshing) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={stories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <NewCard
          post={item}
          onPress={() => navigation.navigate('Details', { postId: item.id })}
        />
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
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
});

export default NewsList;
