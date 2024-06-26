import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { API_ACCESS_TOKEN, API_URL } from '@env'
import { Movie } from '../../types/app'
import MovieItem from '../movies/MovieItem'

const CategorySearch = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0)
  const [listCategory, setListCategory] = useState<
    { id: number; name: string }[]
  >([])
  const [movieList, setMovieList] = useState<Movie[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getCategory()
  }, [])

  useEffect(() => {
    if (selectedCategory !== 0) {
      setMovieList([])
      setPage(1)
      getMovie(1)
    }
  }, [selectedCategory])

  const getMovie = async (page: number) => {
    if (loading) return
    setLoading(true)
    const url = `${API_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${selectedCategory}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      setMovieList((prev) => [...prev, ...data.results])
      setTotalPages(data.total_pages)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getCategory = async () => {
    const url = `${API_URL}genre/movie/list?language=en`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      setListCategory(data.genres)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLoadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1
      setPage(nextPage)
      getMovie(nextPage)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Select Category</Text>
          <Picker
            selectedValue={selectedCategory}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            <Picker.Item key={0} label="Select Category..." value={0} />
            {listCategory.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
        <View style={styles.cardBody}>
          {selectedCategory === 0 ? (
            <Text>No category selected</Text>
          ) : (
            <View style={styles.container}>
              <FlatList
                style={{
                  marginTop: 20,
                  paddingLeft: 10,
                }}
                numColumns={3} // Mengatur jumlah kolom
                columnWrapperStyle={styles.columnWrapper} // Menambahkan gaya wrapper kolom
                data={movieList}
                renderItem={({ item }) => (
                  <MovieItem
                    movie={item}
                    coverType={'poster'}
                    size={{ width: 100, height: 160 }}
                    target={'MovieDetailSearch'}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={handleLoadMore} // Memanggil fungsi handleLoadMore saat mencapai akhir daftar
                onEndReachedThreshold={0.5} // Threshold saat onEndReached dipanggil
                ListFooterComponent={loading ? <Text>Loading...</Text> : null} // Menambahkan indikator loading di footer
              />
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  cardHeader: {
    backgroundColor: '#800080',
    padding: 6,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    color: 'white',
    width: 150,
  },
  cardBody: {
    minHeight: 500,
    flexDirection: 'column',
  },
  columnWrapper: {
    justifyContent: 'space-between', // Menambahkan spasi antara kolom
    marginBottom: 20, // Menambahkan jarak bawah antar baris
  },
})

export default CategorySearch
