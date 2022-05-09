import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { getPoster } from "../services/MovieService";
import Colors from "../constants/Colors";
import Images from "../constants/Images";

const CastCard = ({originalName, image, characterName}) => {
  return (
    <View style={styles.container} >
     <Image 
     source={image ?{uri: getPoster(image)}: Images.NO_IMAGE}
     resizeMode={image ?"cover" : "contain"}
     style={styles.image}
     />
     <Text style={styles.name} numberOfLines={2}>{originalName}</Text>
     <Text style={styles.character} numberOfLines={2}>{characterName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
   fontSize:12,
   fontWeight: 'bold',
  },
  image: {
    height:120,
    width:80,
    borderRadius:10,
  },
  character:  {
width:80,
fontSize:10,
  },
 
});

export default CastCard;
