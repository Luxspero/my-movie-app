import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { MovieItemProps } from '../../types/app'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome } from '@expo/vector-icons'
import { StackActions, useNavigation } from '@react-navigation/native'

const MovieItem = ({
  movie,
  coverType,
  size,
  target,
}: MovieItemProps & { target?: string }) => {
  const navigation = useNavigation()
  const pushAction = StackActions.push(target ?? 'MovieDetail', {
    id: movie.id,
  })
  return (
    <View>
      <Pressable onPress={() => navigation.dispatch(pushAction)}>
        <ImageBackground
          resizeMode="cover"
          style={[size, styles.backgroundImage]}
          imageStyle={styles.backgroundImageStyle}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${
              coverType === 'poster' ? movie.poster_path : movie.backdrop_path
            }`,
          }}
        >
          <LinearGradient
            colors={['#00000000', 'rgba(0,0,0,0.7)']}
            style={styles.gradientStyle}
          >
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={12} color="yellow" />
              <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    marginRight: 4,
  },
  backgroundImageStyle: {
    borderRadius: 8,
  },
  movieTitle: {
    color: 'white',
  },
  gradientStyle: {
    padding: 8,
    height: '100%',
    width: '100%',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    color: 'yellow',
    fontWeight: 'bold',
  },
})

export default MovieItem
