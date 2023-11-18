import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    logo: {
      height: 230,
      resizeMode: 'contain'
    },

    containerLogo: {
      flex: 1,
      backgroundColor: '#fff',
    },

    homeLogo: {
      height: 120, 
      width: 127, 
      resizeMode: 'contain', 
      alignSelf: 'flex-start'
    },

  });

  export default styles;