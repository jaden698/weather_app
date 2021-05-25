import React from 'react';
import { View} from 'react-native';

export default function UnitsPicker() {
    return (
        <View>
            <Picker>
                <Picker.Item label="C°" value="metric"/>
                <Picker.Item label="F°" value="metric"/>
            </Picker>
        </View>
    )
}
