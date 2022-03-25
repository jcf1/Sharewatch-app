import React from 'react';
import { Platform, Text } from 'react-native';

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
        <Text style={{fontFamily,fontSize,color,paddingTop,paddingBottom,paddingLeft,paddingRight}}>{ children }</Text>
    );
}