import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {BIP39} from 'bip39';
import {generateMnemonic,mnemonicToSeed} from 'bip39';
import ethUtil from 'ethereumjs-util';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'gold',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  wordContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wordButton: {
    backgroundColor: 'gold',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  wordText: {
color: 'white',
    fontWeight: 'bold',
  },
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  selectedText: {
    margin: 10,
    fontWeight: 'bold',
  },
  hideContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  hideButton: {
    backgroundColor: 'gold',
    padding: 10,
    borderRadius: 5,
  },
  hideText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Get the world's first non-custodial cyher card</Text>
      <Text>Explore all of web3 in one place</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CreateSeedPhrase')}>
          <Text style={styles.buttonText}>Create New Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert('This feature is not yet implemented')}>
          <Text style={styles.buttonText}>Import Existing Wallet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CreateSeedPhrase = ({ navigation }) => {
  const [seedPhrase, setSeedPhrase] = useState(BIP39.generateMnemonic());
  const [hidden, setHidden] = useState(true);
  const [selected, setSelected] = useState([]);

  const onWordPress = (word) => {
    setSelected((prevState) => [...prevState, word]);
  };

  const onConfirmPress = () => {
    if (selected.join(' ') === seedPhrase) {
      const seed = BIP39.mnemonicToSeedSync(seedPhrase);
      const privateKey = ethUtil.keccak256(seed);
      const address = '0x' + ethUtil.privateToAddress(privateKey).toString('hex');
      navigation.navigate('Address', { ethereumAddress: address });
    } else {
      ToastAndroid.show('Incorrect seed phrase', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Seed Phrase</Text>
      <View style={styles.hideContainer}>
        <TouchableOpacity
          style={styles.hideButton}
          onPress={() => setHidden((prevState) => !prevState)}>
          <Text style={styles.hideText}>
            {hidden ? 'Show' : 'Hide'}
          </Text>
        </TouchableOpacity>
     </View>
      {hidden ? (
        <Text>**********</Text>
      ) : (
        <Text>{seedPhrase}</Text>
      )}
      <View style={styles.wordContainer}>
        {seedPhrase.split(' ').map((word) => (
          <TouchableOpacity
            key={word}
            style={styles.wordButton}
            onPress={() => onWordPress(word)}>
            <Text style={styles.wordText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.selectedContainer}>
        {selected.map((word) => (
          <Text key={word} style={styles.selectedText}>
            {word}
          </Text>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={onConfirmPress}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Address = ({ route }) => {
  const { ethereumAddress } = route.params;

  return (
    <View style={styles.container}>
      <Text>Your Ethereum Address</Text>
      <Text>{ethereumAddress}</Text>
    </View>
  );
};

const Stack = createStackNavigator();

function CypherStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'gold' },
      })}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CreateSeedPhrase" component={CreateSeedPhrase} />
      <Stack.Screen name="Address" component={Address} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <CypherStack/>
    </NavigationContainer>
  );
}

