import { API_ACCESS_TOKEN, API_URL } from '@env'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDebounce } from 'use-debounce'
import { Movie, SearchResult } from '../../types/app'
import MovieItem from '../movies/MovieItem'

const KeywordSearch = () => {
  const [inputSearch, setInputSearch] = useState<string>('')
  const [Keyword, setKeyword] = useDebounce(inputSearch, 2000)
  const [MovieList, setMovieList] = useState<Movie[]>([])

  useEffect(() => {
    getMovie()
  }, [Keyword])

  const getMovie = async () => {
    const url = `${API_URL}search/movie?query=${Keyword}`
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
      setMovieList(data.results)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        onChange={(e) => setInputSearch(e.nativeEvent.text)}
      />

      <Text>Result : {MovieList.length}</Text>
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
