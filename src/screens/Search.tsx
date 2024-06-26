import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import KeywordSearch from '../components/search/KeywordSearch'
import CategorySearch from '../components/search/CategorySearch'

const Search = () => {
  const [selectedBar, setSelectedBar] = useState<string>('Keyword')
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.topBarContainer}>
          {['Keyword', 'Category'].map((item, index) => (
            <Pressable
              key={index}
              onPress={() => setSelectedBar(item)}
              style={[
                styles.topBar,
                {
                  backgroundColor: selectedBar === item ? 'purple' : '#d8b1d4',
                  borderTopLeftRadius: index === 0 ? 100 : 0,
                  borderTopRightRadius: index === 1 ? 100 : 0,
                  borderBottomLeftRadius: index === 0 ? 100 : 0,
                  borderBottomRightRadius: index === 1 ? 100 : 0,
                },
              ]}
            >
              <Text style={styles.topBarLabel}>{item}</Text>
            </Pressable>
          ))}
        </View>
        {selectedBar === 'Keyword' ? <KeywordSearch /> : <CategorySearch />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topBarContainer: {
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
  },
  topBar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: 60,
  },
  topBarLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default Search
