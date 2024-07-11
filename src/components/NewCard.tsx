import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Post, Story } from '../utils/apiClient';
import { formatDate } from '../utils/stringUtils';

interface NewCardProps {
  post: Story;
  onPress: () => void;
}

const NewCard: React.FC<NewCardProps> = ({ post, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.subreddit}>{formatDate(new Date(post.time))}</Text>
        <Text style={styles.meta}>Posted by <Text style={styles.posted}>{post.by}</Text></Text>
        <Text style={styles.meta}>{post.descendants || 0} comments</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subreddit: {   
    color: '#888',
  },
  meta: {
    color: '#aaa',
    fontSize: 12,
  },
  posted: {
    fontWeight: 'bold',
    fontSize: 12 
  }
});

export default NewCard;
