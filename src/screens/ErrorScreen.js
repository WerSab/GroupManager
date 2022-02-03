import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

function ErrorComponent(props) {
    const errorMessage= props.errorMessage;
    return (
        <View>
            <Text>{errorMessage}</Text>
        </View>
    )
}
export default ErrorComponent;