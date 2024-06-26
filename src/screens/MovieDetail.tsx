import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { useEffect, useState } from 'react'
import { API_ACCESS_TOKEN, API_URL } from '@env'
import { FontAwesome } from '@expo/vector-icons'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import { MovieListProps } from '../types/app'
import MovieList from '../components/movies/MovieList'

const MovieDetail = ({ route }: { route: any }) => {
  const { id } = route.params
  const [movie, setMovie] = useState<any>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  const MovieLists: MovieListProps[] = [
    {
      title: 'Recommended Movies',
      path: `movie/${id}/recommendations?language=en-US&page=1`,
      coverType: 'poster',
    },
  ]

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
        Alert.alert('Removed from Favorites')
      } else {
        // Add to favorites
        favoriteMovies.push(movie)
        await AsyncStorage.setItem(
          'favoriteMovies',
          JSON.stringify(favoriteMovies),
        )
        setIsFavorite(true)
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
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
        }}
        style={styles.backdrop}
        imageStyle={styles.backdropImage}
      >
        <LinearGradient
          colors={['#00000000', 'rgba(0,0,0,0.7)']}
          style={styles.backdropOverlay}
        >
          <Text style={styles.title}>{movie.title}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={18} color="yellow" />
              <Text style={styles.ratingStyle}>
                {movie.vote_average.toFixed(1)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleFavorite}
            >
              <FontAwesome
                name={isFavorite ? 'heart' : 'heart-o'}
                size={28}
                color="red"
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.details}>
        <Text style={styles.overview}>{movie.overview}</Text>
        <View style={styles.additionalDetails}>
          <Text style={styles.detail}>Release Date: {movie.release_date}</Text>
          <Text style={styles.detail}>Runtime: {movie.runtime} minutes</Text>
        </View>
      </View>

      <View style={styles.containerListRecommended}>
        {MovieLists.map((movie, index) => (
          <MovieList
            title={movie.title}
            path={movie.path}
            coverType={movie.coverType}
            key={index}
          />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  backdrop: {
    width: '100%',
    height: 250,
    justifyContent: 'flex-end',
  },
  backdropImage: {
    resizeMode: 'cover',
  },
  backdropOverlay: {
    padding: 10,
    justifyContent: 'flex-end',
  },
  details: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 10,
  },
  additionalDetails: {
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 10,
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
    color: 'yellow',
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
  containerListRecommended: {
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 16,
  },
})

export default MovieDetail
