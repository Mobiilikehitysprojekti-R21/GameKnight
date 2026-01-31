import { View, Text } from "react-native";
import { styles } from "../styles/MapStyles";

export const MapScreen = () => {
  return (
    <View style={styles.webFallback}>
      <Text style={styles.webText}>
        Kartta on käytettävissä vain mobiilisovelluksessa.
      </Text>
    </View>
  );
};
