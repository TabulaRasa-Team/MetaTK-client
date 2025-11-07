import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const MenuSvg = (props: SvgProps) => {
  const fillColor = (props.color as string) || (props.fill as string) || '#36DBFF';
  return (
    <Svg width={20} height={14} viewBox="0 0 20 14" fill="none" {...props}>
      <Path fillRule="evenodd" clipRule="evenodd" d="M19.5 2.625H4.5V0.375H19.5V2.625Z" fill={fillColor} />
      <Path fillRule="evenodd" clipRule="evenodd" d="M19.5 7.875H4.5V5.625H19.5V7.875Z" fill={fillColor} />
      <Path fillRule="evenodd" clipRule="evenodd" d="M19.5 13.125H4.5V10.875H19.5V13.125Z" fill={fillColor} />
      <Path fillRule="evenodd" clipRule="evenodd" d="M0 0.75C0 0.335786 0.335786 0 0.75 0H2.25C2.66421 0 3 0.335786 3 0.75V2.25C3 2.66421 2.66421 3 2.25 3H0.75C0.335786 3 0 2.66421 0 2.25V0.75Z" fill={fillColor} />
      <Path fillRule="evenodd" clipRule="evenodd" d="M0 6C0 5.58579 0.335786 5.25 0.75 5.25H2.25C2.66421 5.25 3 5.58579 3 6V7.5C3 7.91421 2.66421 8.25 2.25 8.25H0.75C0.335786 8.25 0 7.91421 0 7.5V6Z" fill={fillColor} />
      <Path fillRule="evenodd" clipRule="evenodd" d="M0 11.25C0 10.8358 0.335786 10.5 0.75 10.5H2.25C2.66421 10.5 3 10.8358 3 11.25V12.75C3 13.1642 2.66421 13.5 2.25 13.5H0.75C0.335786 13.5 0 13.1642 0 12.75V11.25Z" fill={fillColor} />
    </Svg>
  );
};

export default MenuSvg;


