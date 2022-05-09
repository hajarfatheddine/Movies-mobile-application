import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, Dimensions } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from "../constants/Colors"
import React,{ useState, useEffect } from 'react';
import {getMovieById,getPoster,getLanguage} from "../services/MovieService"
import ItemSeparator from '../components/ItemSeparator';
import { Feather,Ionicons } from '@expo/vector-icons';
import CastCard from '../components/CastCard';
import {APPEND_TO_RESPONSE as AR} from "../constants/Urls"
import MovieCard from '../components/MovieCard';

const {height, width} =Dimensions.get('screen');
const setHeight =(h)=> (height/100)*h;
const setWidth =(w)=> (width/100)*w;

const MovieScreen= ({route, navigation}) => {
 // this one shows the movie d that we clicked on
  const {movieId} = route.params;
  const [movie,setMovie]= useState({});
  useEffect(()=>{
      getMovieById(movieId,`${AR.CREDITS},${AR.RECOMMENDATIONS},${AR.SIMILAR}`).then((response) =>setMovie(response?.data));
  },[]);
  return (
    <ScrollView>
      <StatusBar style="auto"/>
  
      <View style={styles.moviePosterImageContainer}>
        <Image style={styles.moviePosterImage} 
        resizeMode="cover"
        source={{uri: getPoster(movie.backdrop_path)}}
        />
      </View>
        <View style={styles.headerContainer}>
          <TouchableOpacity activeOpacity={.5} onPress={()=>navigation.goBack()} >
            <Feather name='chevron-left' size={35} color={Colors.WHITE} />
          </TouchableOpacity>
         
         <TouchableOpacity>
         <Text style={styles.headerText} >
            </Text>
         </TouchableOpacity>
          
        </View>
        
      <ItemSeparator height={setHeight(2)} />
      <View style={styles.movieTitleContainer}>
        <Text style={styles.movieTitle} numberOfLines={3}>{movie?.original_title}</Text>
        <View style={styles.row}>
          <Ionicons name="heart" size={22} color={Colors.HEART}/>
          <Text style={styles.raitingText}>
            {movie?.vote_average}
          </Text>
        </View>
      </View>

      <Text style={styles.genreText}>
        {movie?.genres?.map(genre =>genre?.name)?.join(', ')} |
         {movie?.runtime} min
      
      </Text>
      <Text style={styles.genreText}>
        {getLanguage(movie?.original_language)?.english_name}
      </Text>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>
          Synopsis
        </Text>
        <Text style={styles.overviewText}>{movie?.overview}</Text>
      </View>
      <View>
        <Text style={styles.castTitle}>Cast</Text>
      
        <FlatList
        data={movie?.credits?.cast}
        keyExtractor={(item) => item?.credit_id}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={()=><ItemSeparator width={20} />}
        ListFooterComponent={()=><ItemSeparator width={20} />}
        ItemSeparatorComponent={()=><ItemSeparator width={20} />}
        renderItem={({item})=> (
        <CastCard 
        originalName={item?.name} 
        characterName={item?.character}
        image={item?.profile_path}
        />
  )}
/>
      </View>
      <Text style={styles.extraListTitle}>Recommendations</Text>
      <View style={styles.movieListContainer}>
        <FlatList
       data={movie?.recommendations?.results}
       keyExtractor={(item) => item?.id?.toString()}
       horizontal
       showsHorizontalScrollIndicator={false}
       ListHeaderComponent={()=><ItemSeparator width={20} />}
       ListFooterComponent={()=><ItemSeparator width={20} />}
       ItemSeparatorComponent={()=><ItemSeparator width={20} />}
       renderItem={({item})=> (
        <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.6}
              onPress={()=>navigation.navigate("movie",{movieId:item.id})}
            />
      )}
       />
      </View>

      <Text style={styles.extraListTitle}>Similar Movies</Text>
      <View style={styles.movieListContainer}>
        <FlatList
       data={movie?.similar?.results}
       keyExtractor={(item) => item?.id?.toString()}
       horizontal
       showsHorizontalScrollIndicator={false}
       ListHeaderComponent={()=><ItemSeparator width={20} />}
       ListFooterComponent={()=><ItemSeparator width={20} />}
       ItemSeparatorComponent={()=><ItemSeparator width={20} />}
       renderItem={({item})=> (
        <MovieCard
        title={item.title}
        language={item.original_language}
        voteAverage={item.vote_average}
        voteCount={item.vote_count}
        poster={item.poster_path}
        size={.6}
        //onPress={()=>navigation?.navigate("movie",{movieId:item.id})}//this is the name giving to the movie screen page in the app.js file
      />
      )}
       />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.BASIC_BACKGROUND,
  },
  moviePosterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
  },
  moviePosterImage: {
  
    width: setWidth(145),
    height: setHeight(35),
    alignItems: 'center',
  },
  linearGradient:{
    height:setHeight(6),
    width:setHeight(100),
    position: 'absolute',
    top:0,
    elevation:9,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  headerText: {
    color: Colors.WHITE,
  },
  movieTitleContainer: {
    flexDirection:"row",
    justifyContent: "space-between",
    paddingHorizontal:20,
  },
  movieTitle: {
  color:Colors.BLACK,
  fontSize:20,
  fontWeight:"bold",
  width: setWidth(60),
  },
  raitingText: {
  marginLeft:10,
  fontSize:15,
  },
  row: {
    flexDirection:"row",
    alignItems: "center",
  },
  genreText: {
    color: Colors.LIGHT_GRAY,
    paddingHorizontal:20,
    fontSize:13,
  },
  overviewContainer:{
    justifyContent: "space-between",
    paddingHorizontal:20,
    backgroundColor:Colors.EXTRA_LIGHT_GRAY,
    paddingVertical:10,
    marginVertical:10,
  },
  //check text style props: https://reactnative.dev/docs/0.62/text-style-props
  overviewTitle:{
    fontSize:20,
    color:Colors.BLACK,
    marginBottom:10,
    fontWeight:"bold",
  },
  overviewText:{
    textAlign:"justify",
    paddingVertical:5,
    marginBottom:10,
  },
  castTitle:{
    paddingHorizontal:20,
    paddingVertical:10,
    fontWeight:"bold",
    fontSize:20,
  },
  extraListTitle: {
    paddingHorizontal:20,
    paddingVertical:10,
    fontWeight:"bold",
    fontSize:20,
    },
  movieListContainer:{

    },

});
export default MovieScreen;
