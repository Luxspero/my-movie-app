import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { useEffect, useState } from 'react'
import { API_ACCESS_TOKEN, API_URL } from '@env'
import { FontAwesome } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MovieDetail = ({ route }: { route: any }) => {
  const { id } = route.params
  const [movie, setMovie] = useState<any>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    checkIfFavorite()
    getMovieDetail()
  }, [])

  const getMovieDetail = async () => {
    const url = `${API_URL}movie/${id}?language=en-US`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      setMovie(data)
    } catch (error) {
      console.error(error)
    }
  }

  const checkIfFavorite = async () => {
    try {
      const favoriteMovies = await AsyncStorage.getItem('favoriteMovies')
      if (favoriteMovies) {
        const parsedFavorites = JSON.parse(favoriteMovies)
        const isFav = parsedFavorites.some((fav: any) => fav.id === id)
        setIsFavorite(isFav)
      }
    } catch (error) {
      console.error('Error checking favorites:', error)
    }
  }

  const handleFavorite = async () => {
    try {
      let favoriteMovies: any[] = []
      const favoriteMoviesStr = await AsyncStorage.getItem('favoriteMovies')
      if (favoriteMoviesStr) {
        favoriteMovies = JSON.parse(favoriteMoviesStr)
      }

      if (isFavorite) {
        // Remove from favorites
        const updatedFavorites = favoriteMovies.filter((fav) => fav.id !== id)
        await AsyncStorage.setItem(
          'favoriteMovies',
          JSON.stringify(updatedFavorites),
        )
        setIsFavorite(false)
        console.log(updatedFavorites)
        Alert.alert('Removed from Favorites')
      } else {
        // Add to favorites
        favoriteMovies.push(movie)
        await AsyncStorage.setItem(
          'favoriteMovies',
          JSON.stringify(favoriteMovies),
        )
        setIsFavorite(true)
        console.log(favoriteMovies)
        Alert.alert('Added to Favorites')
      }
    } catch (error) {
      console.error('Error toggling favorites:', error)
    }
  }

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          }}
          style={styles.poster}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={18} color="yellow" />
            <Text style={styles.ratingStyle}>{movie.vote_average}</Text>
          </View>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavorite}
          >
            <FontAwesome
              name={isFavorite ? 'heart' : 'heart-o'}
              size={24}
              color="red"
            />
            <Text style={styles.favoriteText}>
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.additionalDetails}>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={styles.detail}>Release Date: {movie.release_date}</Text>
        <Text style={styles.detail}>Runtime: {movie.runtime} minutes</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  poster: {
    width: 100,
    height: 180,
    borderRadius: 10,
    marginRight: 20,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 10,
  },
  additionalDetails: {
    marginTop: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingStyle: {
    paddingLeft: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  favoriteText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'red',
  },
})

export default MovieDetail
