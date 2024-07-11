// src/components/PlaceholderItem.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

const PlaceholderItem: React.FC = () => {
    return (
        <View style={styles.container}>
            <ContentLoader
                viewBox="0 0 400 160"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                style={styles.loader}
            >
                <Rect x="0" y="0" rx="5" ry="5" width="70%" height="20" />
                <Rect x="0" y="30" rx="5" ry="5" width="90%" height="15" />
                <Rect x="0" y="55" rx="5" ry="5" width="80%" height="15" />
            </ContentLoader>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    loader: {
        width: '100%',
        height: 80,
    },
});

export default PlaceholderItem;
