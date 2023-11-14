import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    logo: {
      height: 232,
      resizeMode: 'contain'
    },

    containerLogo: {
      flex: 1,
      backgroundColor: '#fff',
    },

    homeLogo: {
      height: 130, 
      width: 100, 
      resizeMode: 'contain', 
      alignSelf: 'flex-start'
    },

  });

  export default styles;