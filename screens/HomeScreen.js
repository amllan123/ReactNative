import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { React, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import {fetchTrendingMovies,fetchUpcomingMovies,fetchTopRatedMovies} from "../api/moviedb"
import Loading from "../components/Loading"


const HomeScreen = () => {
  const navigation = useNavigation();
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    getTrendingMovies()
    getUpcomingMovies()
    getTopRatedMovies()
  },[])


  const getTrendingMovies = async ()=>{
    const data = await fetchTrendingMovies();
    console.log('got trending', data.results.length)
    if(data && data.results) setTrending(data.results);
    setLoading(false)
  }
  const getUpcomingMovies = async ()=>{
    const data = await fetchUpcomingMovies();
    console.log('got upcoming', data.results.length)
    if(data && data.results) setUpcoming(data.results);
  }

  const getTopRatedMovies = async ()=>{
    const data = await fetchTopRatedMovies();
    console.log('got top rated', data.results.length)
    if(data && data.results) setTopRated(data.results);
  }
  return (

    <>
      <View className="flex-1 bg-neutral-800">
        <SafeAreaView className="mb-3">
          <View className="flex-row justify-between items-center mx-4">
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
            <Text className="text-white text-3xl font-bold ">Movies</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MagnifyingGlassIcon size="30" strokeWidth={3} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
{ loading ? <Loading/>:
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >

          <TrendingMovies data={trending} />
          <MovieList title={"Upcoming Movies"} data={upcoming} />
          <MovieList title={"Toprated Movies"} data={topRated} />
        </ScrollView>}
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    fontFamily: "nunito",
    fontSize: 20,


  }
})