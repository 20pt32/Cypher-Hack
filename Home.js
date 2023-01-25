import React from 'react';
import { StyleSheet, View, Text, StatusBar, Image } from 'react-native';

export default function Home ({navigation}) {
    return(
        <View style={styles.container}>
            <Image source={require('./assets/home-banner.png')} style={styles.bannerImage}></Image>
            <View style={styles.content}>
                <Text style={styles.mainText}>Open up Home.js to start working!</Text>
                <Text style={styles.helpText}>All the libraries and assets required are available in the app directory.</Text>
                <Text style={styles.hintText}>Hint: Make use of stack navigation in App.js to navigate between screens!</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    bannerImage: {
      width: '100%',
      height: '20%',
      resizeMode: 'contain'
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    },
    mainText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    helpText: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 10
    },
    hintText: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 15
    }
  });