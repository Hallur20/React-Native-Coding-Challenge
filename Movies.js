import React from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { Card } from "react-native-elements";

export default class Movies extends React.Component {
  constructor() {
    super();
    this.state = { movies: [] };
  }

  componentDidMount() {
    this.props.movieUrls.forEach((element) => {
      fetch(element)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const movies = this.state.movies;
          movies.push(json);
          this.setState({ movies });
        });
    });
  }

  render() {
    return (
      <View>
        <Button
          title="go back"
          onPress={() => this.props.toggleMovieScreen()}
        />
        <ScrollView>
          {this.state.movies === [] ? (
            <Text>loading...</Text>
          ) : (
            this.state.movies.map((movie, key) => {
              return (
                <Card title={movie.title} key={key}>
                  <Text>{movie.opening_crawl}</Text>
                </Card>
              );
            })
          )}
        </ScrollView>
      </View>
    );
  }
}
