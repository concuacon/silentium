import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Text, FlatList, ActivityIndicator, Animated } from 'react-native';

import { fetchStories, Story } from '../utils/apiClient';
import { NewsListScreenProps } from '../utils/types';
import NewCard from '../components/NewCard';


const NewsList: React.FC<NewsListScreenProps> = ({navigation}) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const loadStories = useCallback(async (page: number, append: boolean = false) => {
    try {
      if(append) {
        setLoadingMore(true);
      }  else {
        setLoading(true);
      }
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
      if (loadingMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
      setIsRefreshing(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
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

  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator style={{ color: '#000' }} />;
  };

  return (
    <FlatList
      data={stories}
      keyExtractor={(item: { id: { toString: () => any; }; }, index: number) => `${item.id}-${index}`}
      renderItem={({ item }: {item: Story}) => (
        <NewCard
          post={item}
          onPress={() => navigation.navigate('Details', { postId: item.id })}
        />
      )}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListFooterComponent={renderFooter}
      contentContainerStyle={{padding: 10}}
    />
  );
};

export default NewsList;
