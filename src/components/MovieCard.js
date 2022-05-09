import React from 'react'
import { StyleSheet, Text, View, Image,TouchableNativeFeedback, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Images from '../constants/Images';
import { useState} from "react";
import { getPoster,getLanguage} from '../services/MovieService';



const MovieCard =({
    title,
    poster,
    language,
    voteAverage,
    voteCount,
    size,
    heartLess,
    onPress
}) => {
const [liked,setLiked] = useState(false);
const [voteCountValue, setVoteCountValue] = useState(voteCount);


    return(
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <ImageBackground 
    style={{...styles.container,width:230 * size, height:340 * size}}
    imageStyle={{borderRadius:12}}
    source={{uri: getPoster(poster)}}
    >
        <View style={{...styles.imdbContainer,paddingVertical: 3 *size}}>
            <Image source={Images.IMDB}  style={{...styles.imdbImage, height:20* size,width: 50* size}}/>
            <Text style={{...styles.imdbRating,marginRight: 5 * size, fontSize:12}}>{voteAverage}</Text>
     </View>
    
    
    {!heartLess ? (
        <TouchableNativeFeedback onPress={()=> {setLiked(!liked);
            setVoteCountValue(
              liked ? voteCountValue - 1 : voteCountValue + 1
            );
          }}
        >
            <Ionicons
            name={liked ? 'heart' : 'heart-outline' }
            size={25}
            color={liked ? Colors.HEART : Colors.WHITE}
            style={{position: 'absolute',left:10 ,bottom:10}}
            />
        </TouchableNativeFeedback>
    ): null}
    </ImageBackground>
    <View           
    style={{ ...styles.movieTitle, width: 230 * size }}
    numberOfLines={3}>
        <Text>
           {title}
        </Text>
        <View style={styles.movieSubTitleContainer}>
            <Text style={styles.movieSubTitle}>
                {getLanguage(language).english_name}
            </Text>
            <View style={styles.rowAndCenter}>
            <Ionicons name="heart" size={24} color={Colors.HEART}/>
            <Text>{voteCountValue}</Text>
            </View>
        </View>
    </View>
    </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
        height: 340,
        width: 230,
        borderRadius: 12,
        elevation: 5,
        marginVertical: 2,
  
    },
    movieTitle: {
        color: Colors.GRAY,
        paddingVertical: 2,
        marginTop: 5,
        width: 230,
    },
    movieSubTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    movieSubTitle: {
        fontSize: 12,
    
    },
    rowAndCenter: {
        flexDirection: "row",
        alignItems: "center",
    },
    imdbContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: Colors.YELLOW,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 12,
        paddingVertical: 3,
      },
      imdbImage: {
        height: 20,
        width: 50,
        borderBottomLeftRadius: 5,
      },
      imdbRating: {
        marginRight: 5,
        color: Colors.HEART,
      },
});

MovieCard.defaultProps = {
    size: 1,
    heartLess: true,
};
export default MovieCard;

