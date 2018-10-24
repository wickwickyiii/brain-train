import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import AppNavigator from "../../navigation/AppNavigator";
import { Button } from "react-native-elements";

import { connect } from "react-redux";
import { getTrivia } from "../../redux/reducer";
import { MonoText } from "../StyledText";
import MESSAGE_GREY from "../../assets/images/mobileGUI/coloredButtons/button_gry.png";
import MESSAGE_RED from "../../assets/images/mobileGUI/coloredButtons/button_red.png";
import MESSAGE_BLUE from "../../assets/images/mobileGUI/coloredButtons/button_blu.png";
import MESSAGE_GREEN from "../../assets/images/mobileGUI/coloredButtons/button_grn.png";
import MESSAGE_YELLOW from "../../assets/images/mobileGUI/coloredButtons/button_ylw.png";

const { width, height } = Dimensions.get("window");
const GAME_WIDTH = width - 10;
const CARD_HEIGHT = 100;

class TriviaGame extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      data: [],
      time: [],
      cardIndex: 0
    };
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.props.getTrivia("History", 4, 2);
  }

  //longest question:         "'In 1967, a magazine published a story about extracting hallucinogenic chemicals from bananas to raise moral questions about banning drugs.'"
  //longest correct answer:   "'A Fistful of Dollars', 'For a Few Dollars More', 'The Good, the Bad, and the Ugly'"
  //longest incorrect answer: "'You used to be so warm and affectionate...but now you're quick to get into your regret'"

  shuffle(arr) {
    var j, x, i;
    for (i = arr.length; i > 0; i--) {
      j = Math.floor(Math.random() * i);
      x = arr[i - 1];
      arr[i - 1] = arr[j];
      arr[j] = x;
    }
  }

  initializeCards() {
    let answerArr = [];
    let i = this.state.cardIndex;
    if (this.props.trivia.length) {
      answerArr = this.props.trivia[i].incorrect_answers.map(e => {
        return {
          // Removes quotes from the outside of each string
          answer: e.replace(/^['"]+(.*)['"]+/g, "$1"),
          isCorrect: false
        };
      });
      answerArr.push({
        answer: this.props.trivia[i].correct_answer,
        isCorrect: true
      });
      this.shuffle(answerArr);
      console.log(answerArr);
    }
    return answerArr;
  }

  render() {
    const cardBgArr = [
      MESSAGE_RED,
      MESSAGE_BLUE,
      MESSAGE_YELLOW,
      MESSAGE_GREEN
    ];
    let cards = this.initializeCards();
    let { cardIndex } = this.state;

    return (
      <ImageBackground
        source={require("../../assets/images/mobileGUI/sky_bg.png")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <ImageBackground
            source={MESSAGE_GREY}
            style={[styles.flashCard, { width: GAME_WIDTH }]}
          >
            <Text style={styles.bodyText}>
              {this.props.trivia.length
                ? this.props.trivia[cardIndex].question
                : "Loading... Please wait"}
            </Text>
          </ImageBackground>
          {cards.map((e, i) => {
            return (
              <TouchableOpacity
                focusedOpacity={0.7}
                activeOpacity={0.7}
                style={[styles.cell]}
                key={"answerCard" + i}
                onPress={() => console.log(e)}
              >
                <ImageBackground
                  source={cardBgArr[i]}
                  style={[styles.flashCard, { width: GAME_WIDTH }]}
                  key={"card" + i}
                >
                  <Text style={styles.bodyText}>{cards[i].answer}</Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  cell: {
    flex: 1,
    height: CARD_HEIGHT
  },
  flashCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: CARD_HEIGHT,
    marginBottom: 20
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bodyText: {
    marginTop: 10,
    fontSize: 15,
    color: "black",
    textAlign: "center"
  }
});

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { getTrivia }
)(TriviaGame);

// {"May 4, 1776","June 4, 1776","July 4, 1776"}

// [
//   "1891",
//   "March 4th",
//   "October 19th",
//   "1887",
//   "December 27th",
//   "September 23rd, 1889",
//   "1894"
// ]