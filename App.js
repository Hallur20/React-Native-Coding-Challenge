import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { Card } from "react-native-elements";
import Constants from "expo-constants";
import Movies from './Movies'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      starwars: null,
      searchName: "",
      showMovies: false,
      movieUrls: [],
    };
  }

  async componentDidMount() {
    const response = await fetch("https://swapi.dev/api/people")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        return json;
      });
    console.log(response);
    this.setState({ starwars: response });
  }

  toggleMovieScreen = () => {
    this.setState({showMovies: false});
    this.setState({movieUrls: []});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.showMovies === true ? (
          <Movies movieUrls={this.state.movieUrls} toggleMovieScreen={this.toggleMovieScreen}/>
        ) : (
          <ScrollView>
            <TextInput
              style={{
                height: 40,
                width: 200,
                borderColor: "gray",
                borderWidth: 1,
              }}
              placeholder="search by character name"
              onChangeText={(text) => {
                this.setState({ searchName: text });
              }}
            />
            {this.state.starwars === null ? (
              <Text>loading...</Text>
            ) : (
              this.state.starwars.results.map((person, key) => {
                if (
                  this.state.searchName === "" ||
                  person.name.includes(this.state.searchName)
                ) {
                  return (
                    <Card title={person.name} key={key}>
                      <Text
                        onPress={() => {
                          console.log(person.films);
                          this.setState({ showMovies: true });
                          this.setState({ movieUrls: person.films });
                        }}
                      >
                        height:{person.height + "\n"}
                        mass:{person.mass + "\n"}
                        hair color:{person.hair_color + "\n"}
                        year of birth:{person.birth_year + "\n"}
                      </Text>
                    </Card>
                  );
                }
              })
            )}
            <StatusBar style="auto" />
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight,
  },
});
