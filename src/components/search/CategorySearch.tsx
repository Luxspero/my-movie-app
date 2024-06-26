import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { API_ACCESS_TOKEN, API_URL } from '@env'

const CategorySearch = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    { id: number; name: string }[]
  >([])

  useEffect(() => {
    getCategory()
  }, [])

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
      setSelectedCategory(data.genres)
    } catch (error) {
      console.error(error)
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
            {selectedCategory.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
        <View style={styles.cardBody}></View>
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
    flexDirection: 'row',
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  moviePoster: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  movieTitle: {
    fontSize: 16,
  },
})

export default CategorySearch
