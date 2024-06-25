import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  StatusBar,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome } from '@expo/vector-icons'
import { Movie } from '../types/app'
import {
  StackActions,
  TabActions,
  useNavigation,
} from '@react-navigation/native'

const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([])

  useEffect(() => {
    getFavoriteMovies()
  }, [favoriteMovies])

  const getFavoriteMovies = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteMovies')
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites)
        setFavoriteMovies(parsedFavorites)
      }
    } catch (error) {
      console.error('Error retrieving favorite movies:', error)
    }
  }
  const navigation = useNavigation()
  const navigateToMovieDetail = (id: number) => {
    navigation.dispatch(TabActions.jumpTo('Home'))
    navigation.dispatch(
      StackActions.push('MovieDetail', {
        id: id,
      }),
    )
  }

  const renderItem = ({ item }: { item: Movie }) => (
    <Pressable
      style={styles.movieContainer}
      onPress={() => {
        navigateToMovieDetail(item.id)
      }}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.movieDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={18} color="yellow" />
          <Text style={styles.ratingStyle}>{item.vote_average}</Text>
        </View>
      </View>
    </Pressable>
  )

  return (
    <View style={styles.container}>
      {favoriteMovies.length === 0 ? (
        <Text style={styles.noFavorites}>No favorite movies yet.</Text>
      ) : (
        <FlatList
          data={favoriteMovies}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 32,
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  noFavorites: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  movieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  movieDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingStyle: {
    paddingLeft: 5,
    color: 'black',
    fontWeight: 'bold',
  },
})

export default Favorite
