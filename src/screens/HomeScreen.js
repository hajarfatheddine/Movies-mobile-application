import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import GenreCard from '../components/GenreCard';
import ItemSeparator from '../components/ItemSeparator';
import React, { useState, useEffect } from "react";
import MovieCard from '../components/MovieCard';
import {
  getNowPlayingMovies,
  getUpComingMovies,
  getAllGenres,
} from '../services/MovieService'
import { Feather } from '@expo/vector-icons';



const Genres =["ALL", "Action", "Comedy", "Horror","Romance", "Sci-Fi"]

const HomeScreen= ({navigation}) => {
//the active genre meaning the one that is onclick
const [activeGenre,setActiveGenre]= useState("ALL");

//movies that are now playing {check the tmdb documentation}
//https://developers.themoviedb.org/3/movies/get-now-playing
const [nowPlayingMovies, setNowPlayingMovies] = useState({});

//the upcoming movies meaning the ones that are streaming soon
//https://developers.themoviedb.org/3/movies/get-upcoming
const [upComingMovies, setUpComingMovies] = useState({});

//return a mixture of all the movie genres that exist and currently playing
//https://developers.themoviedb.org/3/genres/get-movie-list
const [genres, setGenres] = useState([{id:10110,name: 'ALL'}]);


useEffect(() => {
  // LIST of movies that are currently playing  [data]
  getNowPlayingMovies().then((movieResponse) =>
      setNowPlayingMovies(movieResponse.data)
    );

    //LIST of movies that will be streaming soon
  getUpComingMovies().then((movieResponse) =>
  setUpComingMovies(movieResponse.data)
    );

    //LIST of all genres
  getAllGenres().then((genreResponse) =>
  setGenres([...genres, ...genreResponse.data.genres])
    );

}, []);
  return (
    <ScrollView style={styles.container}>
      <StatusBar style='auto' translucent={false} 
      backgroundColor={Colors.BASIC_BACKGROUND}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Showing</Text>
       <TouchableOpacity activeOpacity={0.8} >
        <Feather name="search" size={26} color={Colors.BLACK} />
        </TouchableOpacity>
      </View>
      <View style={styles.genreListContainer}>
        <FlatList 
        data={genres} 
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListHeaderComponent={()=><ItemSeparator width={20} />}
        ListFooterComponent={()=><ItemSeparator width={20} />}
        renderItem={({item}) =>(
        <GenreCard 
        genreName={item.name} 
        active={item.name === activeGenre ? true : false} 
        onPress={(genreName)=>setActiveGenre(genreName)}
        />
        )}
        />
        </View>
        <View>
        <FlatList
          data={nowPlayingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={false}//means that the view wiil have the like button
              onPress={()=>navigation.navigate("movie",{movieId:item.id})}//this is the name giving to the movie screen page in the app.js file
            />
          )}
        />  
        </View>
        <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Coming up soon</Text>
      </View>
      <View>
        <FlatList
          data={upComingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.5}
              onPress={()=>navigation.navigate("movie",{movieId:item.id})}
            />
          )}
        />  
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.BASIC_BACKGROUND,
  },
  headerContainer :{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:20,
    paddingVertical:10,
  },
  headerTitle:{
    fontSize:28,
    marginBottom:10,
  },
  headersubTitle :{
    fontSize:13,
    color:Colors.ACTIVE,
  },
  genreListContainer: {
    paddingVertical:10,
  },

});
export default HomeScreen;
