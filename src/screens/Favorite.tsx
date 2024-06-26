import { useEffect, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { Movie } from '../types/app'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MovieItem from '../components/movies/MovieItem'

const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([])

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
  return (
    <View style={styles.container}>
      <FlatList
        style={{
          marginTop: 20,
          paddingLeft: 10,
        }}
        numColumns={3} // Mengatur jumlah kolom
        columnWrapperStyle={styles.columnWrapper} // Menambahkan gaya wrapper kolom
        data={favoriteMovies}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            coverType={'poster'}
            size={{ width: 100, height: 160 }}
            target={'MovieDetailFav'}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Menambahkan spasi antara kolom
    marginBottom: 20, // Menambahkan jarak bawah antar baris
  },
})

export default Favorite
