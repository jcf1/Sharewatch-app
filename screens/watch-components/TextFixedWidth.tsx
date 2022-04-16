import React from 'react';
import { Platform, View, Text } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";


interface Props {
    fontSize: number;
    color: string;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    children: string;
};

export const TextFixedWidth: React.FC<Props> = ({ fontSize, color, paddingTop, paddingBottom, paddingLeft, paddingRight, children }) => {
    const fontFamily = Platform.OS === 'ios' ? 'Courier New' : 'monospace';

    return (
        <View style={{paddingTop,paddingBottom,paddingLeft,paddingRight}}>
            <Text style={{color,fontFamily,fontSize: RFPercentage(fontSize)}}>{ children }</Text>
        </View>
    );
}