import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Movie, MovieListProps } from '../types/app'
import { useEffect, useState } from 'react'
import { API_ACCESS_TOKEN, API_URL } from '@env'
import MovieItem from './MovieItem'

const MovieList = ({ title, path, coverType }: MovieListProps) => {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    getMovieList()
  }, [])

  const coverImageSize = {
    poster: {
      width: 100,
      height: 160,
    },
    backdrop: {
      width: 200,
      height: 160,
    },
  }

  const getMovieList = async () => {
    const url = API_URL + path
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results)
      })
      .catch((error) => console.log(error))
  }

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.purpleLabel} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        style={{
          ...styles.movieList,
          maxHeight: coverImageSize[coverType].height,
        }}
        data={movies}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            coverType={coverType}
            size={coverImageSize[coverType]}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    marginLeft: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  purpleLabel: {
    width: 20,
    height: 40,
    backgroundColor: 'purple',
    borderRadius: 4,
    marginRight: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieList: {
    paddingLeft: 4,
    marginTop: 8,
  },
})

export default MovieList
