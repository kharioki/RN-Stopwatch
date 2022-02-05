import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { useReducer, useEffect, useRef } from 'react';

const initialState = {
  isRunning: false,
  timeElapsed: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'start':
      return { ...state, isRunning: true };
    case 'stop':
      return { ...state, isRunning: false };
    case 'reset':
      return { ...state, timeElapsed: 0 };
    case 'tick':
      return { ...state, timeElapsed: state.timeElapsed + 1 };
    default:
      throw new Error();
  }
}

const Button = ({ title, onPress }) => (
  <TouchableHighlight
    style={styles.button}
    onPress={onPress}
    activeOpacity={0.6}
    underlayColor="#fdc674"
  >
    <Text style={styles.buttonText}>
      {title}
    </Text>
  </TouchableHighlight>
);

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const intervalRef = useRef();

  useEffect(() => {
    if (!state.isRunning) {
      return;
    }

    intervalRef.current = setInterval(() => dispatch({ type: 'tick' }), 1000);
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = 0;
    }
  }, [state.isRunning]);

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{state.timeElapsed}s</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Start"
          onPress={() => dispatch({ type: 'start' })}
        />
        <Button
          title="Stop"
          onPress={() => dispatch({ type: 'stop' })}
        />
        <Button
          title="Reset"
          onPress={() => dispatch({ type: 'reset' })}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#3a3a3a',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  button: {
    borderWidth: 2,
    borderColor: '#fdc674',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#444',
  },
});
