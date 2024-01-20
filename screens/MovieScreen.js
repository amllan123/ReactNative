import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';
import Loading from "../components/Loading";

// Get the device dimensions
var { width, height } = Dimensions.get("window");

const MovieScreen = () => {
  // Use React Navigation hook for navigation
  const navigation = useNavigation();
  // State to track the like status
  const [isliked, SetisLiked] = useState(false);

  const { params: item } = useRoute();

  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    getMovieDetials(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetials = async id => {
    const data = await fetchMovieDetails(id);
    console.log('got movie details');
    setLoading(false);
    if (data) {
      setMovie({ ...movie, ...data });
    }
  }
  const getMovieCredits = async id => {
    const data = await fetchMovieCredits(id);
    console.log('got movie credits')
    if (data && data.cast) {
      setCast(data.cast);
    }

  }
  const getSimilarMovies = async id => {
    const data = await fetchSimilarMovies(id);
    console.log('got similar movies');
    if (data && data.results) {
      setSimilarMovies(data.results);
    }

  }
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* Header Section */}
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row items-center justify-between px-4 mt-3">
          {/* Back button */}
          <TouchableOpacity
            style={{ backgroundColor: "black" }}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          {/* Like button */}
          <TouchableOpacity onPress={() => SetisLiked(!isliked)}>
            <HeartIcon
              size={35}
              strokeWidth={2.5}
              color={isliked ? "#DA0C81" : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      {/* Movie Image Section */}
      {loading ? <Loading /> : <View>
        <Image
          source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }}
          style={{ width, height: height * 0.55 }}
        />
        {/* Gradient overlay on the image */}
        <LinearGradient
          colors={[
            "transparent",
            "rgba(23, 23, 23, 0.8)",
            "rgba(23, 23, 23, 1)",
          ]}
          style={{ width, height: height * 0.4 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute bottom-0"
        />
      </View>}

      {/* Movie Details Section */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* Movie title */}
        <Text className="text-white text-center text-3xl font-bold tracking-widest">
          {movie?.title}
        </Text>

        {/* Release information */}
        {
          movie?.id ? (
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
            </Text>
          ) : null
        }
      </View>

      {/* Genre Section */}

      <View className="flex-1 items-center justify-center">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
        >
          <View className="flex-row justify-center mt-1 mx-4 space-x-2">
            {/* Genre tags */}

            {
              movie?.genres?.map((genre,inex)=>{

                <Text
                style={{ backgroundColor: "#3D3B40" }}
                className="text-neutral-400 p-1 rounded-lg font-semibold text-base text-center "
              >
                {genre?.name} 
              </Text>
              })
              
            }

          </View>
        </ScrollView>
      </View>



      {/* Description */}
      <Text className="text-neutral-400 mx-4  tracking-wide  ">
       {
        movie?.overview
       }
      </Text>

      {
         movie?.id && cast.length>0 && <Cast navigation={navigation} cast={cast} />
      }
      <MovieList title={"Similar Movies"} data={similarMovies} />
    </ScrollView>
  );
};

export default MovieScreen;
