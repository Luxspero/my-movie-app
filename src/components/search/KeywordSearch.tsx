import { API_ACCESS_TOKEN, API_URL } from '@env'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDebounce } from 'use-debounce'
import { Movie } from '../../types/app'
import MovieItem from '../movies/MovieItem'

const KeywordSearch = () => {
  const [inputSearch, setInputSearch] = useState<string>('')
  const [Keyword] = useDebounce(inputSearch, 1000)
  const [MovieList, setMovieList] = useState<Movie[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [totalResults, setTotalResults] = useState<number>(0) // State untuk total results
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (Keyword) {
      setMovieList([])
      setPage(1)
      getMovie(1)
    } else {
      setMovieList([])
    }
  }, [Keyword])

  const getMovie = async (page: number) => {
    if (loading || !Keyword) return
    setLoading(true)
    const url = `${API_URL}search/movie?query=${Keyword}&page=${page}&sort_by=popularity.desc`
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
      setTotalResults(data.total_results)
      setTotalPages(data.total_pages)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleLoadMore = () => {
    if (page < totalPages && !loading) {
      const nextPage = page + 1
      setPage(nextPage)
      getMovie(nextPage)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={inputSearch}
        onChangeText={(text) => setInputSearch(text)}
      />

      <Text>Result : {totalResults}</Text>
      <View style={styles.resultContainer}>
        <FlatList
          style={{
            marginTop: 20,
            paddingLeft: 10,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-evenly',
            marginBottom: 20,
          }}
          numColumns={3}
          data={MovieList}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 4,
    paddingTop: 4,
    fontSize: 16,
  },
  resultContainer: {
    marginBottom: 30,
  },
})

export default KeywordSearch
