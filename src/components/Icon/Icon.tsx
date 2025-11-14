import React from 'react';
import { TouchableOpacity } from 'react-native';

import PinSvg from './Icons/Pin';
import CafePinSvg from './Icons/CafePin';
import FoodPinSvg from './Icons/FoodPin';
import MenuSvg from './Icons/Menu';

const icons = {
  pin: PinSvg,
  cafePin: CafePinSvg,
  foodPin: FoodPinSvg,
  menu: MenuSvg,
};

type IconName = keyof typeof icons;

interface Props {
    name: IconName;
    pressname?: IconName;
    width?: number;
    height?: number;
    color?: string;
    fill?: string;
    primaryColor?: string;
    isPress?: boolean;
    onPress?: () => void;
}

const Icon: React.FC<Props> = ({ name, onPress, pressname = name, isPress = false, ...props }) => {
    const SvgIcon = icons[name];
    if (onPress) {
        if (isPress){
            const SvgIconPress = icons[pressname];
            return (
                <TouchableOpacity onPress={onPress}>
                    <SvgIconPress {...props} />
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity onPress={onPress}>
                <SvgIcon {...props} />
            </TouchableOpacity>
        );
    }
    return <SvgIcon {...props} />;
};

export default Icon;
