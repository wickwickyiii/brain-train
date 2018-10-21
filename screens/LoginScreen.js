import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import AppNavigator from "../navigation/AppNavigator";
import axios from "axios";
// import LandingScreen from "./LandingScreen";
import { Button } from "react-native-elements";
// import Icon from "react-native-vector-icons";

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      users: [],
      newUser: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:3001/api/users")
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleLogin() {
    let { users, username, password } = this.state;
    var userCheck = () => {
      if (!users.length) {
        return null;
      } else {
        for (var i = 0; i < users.length; i++) {
          users[i].uname === username && users[i].password === password
            ? () => handleSubmit()
            : () => handleNewUser(username, password);
        }
      }
    };
    var handleSubmit = async () => {
      let id = 0;
      await users.map((e, i) => {
        if (username === e.uname) {
          id = e.id;
        }
      });
      axios
        .get(`http://localhost:3001/api/user/${id}`)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    };

    var handleNewUser = (uname, pword) => {
      axios
        .post("http://localhost:3001/api/user", { uname, pword })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    };
    userCheck();
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.loginTitle}>Brain Train</Text>

        <View>
          <TextInput
            onChangeText={text => this.setState({ username: text })}
            placeholder="USERNAME"
            style={styles.input}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            placeholderTextColor="black"
          />
        </View>
        <View>
          <TextInput
            onChangeText={text => this.setState({ password: text })}
            placeholder="PASSWORD"
            style={styles.input}
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            placeholderTextColor="black"
          />
        </View>

        <TouchableOpacity>
          <Button
            onPress={() => this.props.navigation.navigate("Landing")}
            title="START"
            buttonStyle={{
              backgroundColor: "#06439E",
              width: 350,
              height: 60,
              marginVertical: 10,
              // marginLeft: 15,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
          />
        </TouchableOpacity>

        <View contentContainerStyle={styles.container}>
          <Text>Forgot your username or password?</Text>
          <TouchableOpacity
            onPress={() => console.warn("You've been reminded")}
          >
            <Text>Yep, remind me.</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linebreak} />

        <TouchableOpacity>
          <Button
            onPress={() => this.props.navigation.navigate("Home")}
            title="BACK"
            buttonStyle={{
              backgroundColor: "#06439E",
              width: 170,
              height: 50,
              marginTop: 70,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3783F5",
    justifyContent: "center",
    alignItems: "center"
  },
  linebreak: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginVertical: 40
  },
  input: {
    width: 350,
    height: 60,
    paddingLeft: 15,
    marginVertical: 10,
    backgroundColor: "#AECEF3",
    color: "black",
    borderRadius: 3,
    borderColor: "transparent",
    borderWidth: 0
  },
  loginTitle: {
    fontFamily: "sans-serif-medium",
    fontSize: 42,
    textAlign: "center",
    marginTop: 85,
    marginBottom: 10
  },
  landing: {
    display: "none"
  }
});

export default LoginScreen;
