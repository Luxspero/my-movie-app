import { ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { MovieListProps } from '../types/app'
import MovieList from '../components/MovieList'

const MovieLists: MovieListProps[] = [
  {
    title: 'Now Playing in Theaters',
    path: 'movie/now_playing?language=en-US&page=1',
    coverType: 'backdrop',
  },
  {
    title: 'Popular Movies',
    path: 'movie/popular?language=en-US&page=1',
    coverType: 'poster',
  },
  {
    title: 'Top Rated Movies',
    path: 'movie/top_rated?language=en-US&page=1',
    coverType: 'poster',
  },
  {
    title: 'Upcoming Movies',
    path: 'movie/upcoming?language=en-US&page=1',
    coverType: 'poster',
  },
]

const Home = ({ navigation }: any) => {
  return (
    <ScrollView>
      <View style={styles.container}>
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
    marginTop: StatusBar.currentHeight ?? 32,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 16,
  },
})

export default Home
