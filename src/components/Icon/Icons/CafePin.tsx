import React from 'react';
import Svg, { Path, G, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend, SvgProps } from 'react-native-svg';

const CafePinSvg = (props: SvgProps & { primaryColor?: string }) => {
  const primary = props.primaryColor || '#FF992D';
  return (
    <Svg width={68} height={83} viewBox="0 0 68 83" fill="none" {...props}>
      <G filter="url(#filter0_d_cafe)">
        <Path
          d="M34 69C35.6569 69 37 70.3431 37 72C37 73.6569 35.6569 75 34 75C32.3431 75 31 73.6569 31 72C31 70.3431 32.3431 69 34 69ZM34 0C50.5685 0 64 13.4315 64 30C64 44.049 54.3428 55.8416 41.3047 59.1035C39.9888 59.4327 38.7208 59.9595 37.6357 60.7734C36.5601 61.5803 35.6873 62.6264 35.0859 63.8291L34.8945 64.2109C34.526 64.948 33.474 64.948 33.1055 64.2109L32.915 63.8301C32.3134 62.6267 31.4397 61.5796 30.3633 60.7725C29.2783 59.9589 28.0109 59.4327 26.6953 59.1035C13.6573 55.8415 4 44.0489 4 30C4 13.4315 17.4315 0 34 0Z"
          fill={primary}
          fillOpacity={0.7}
        />
      </G>
      <Path
        d="M45.0769 20H24.8846C24.6296 20 24.385 20.1008 24.2047 20.2802C24.0244 20.4595 23.9231 20.7028 23.9231 20.9565V32.4348C23.9248 33.9564 24.5332 35.4151 25.6148 36.491C26.6963 37.567 28.1627 38.1722 29.6923 38.1739H36.4231C37.9526 38.1722 39.419 37.567 40.5006 36.491C41.5822 35.4151 42.1906 33.9564 42.1923 32.4348V27.6522H43.274C44.2619 27.6511 45.2089 27.2602 45.9075 26.5653C46.606 25.8705 46.9989 24.9283 47 23.9457V21.913C47 21.4057 46.7974 20.9191 46.4367 20.5603C46.0761 20.2016 45.587 20 45.0769 20ZM45.0769 23.9457C45.0769 24.4213 44.887 24.8775 44.5489 25.2138C44.2108 25.5502 43.7522 25.7391 43.274 25.7391H42.1923V21.913H45.0769V23.9457ZM43.1538 40.087H22.9615C22.7065 40.087 22.462 40.1877 22.2816 40.3671C22.1013 40.5465 22 40.7898 22 41.0435C22 41.2972 22.1013 41.5405 22.2816 41.7198C22.462 41.8992 22.7065 42 22.9615 42H43.1538C43.4089 42 43.6534 41.8992 43.8338 41.7198C44.0141 41.5405 44.1154 41.2972 44.1154 41.0435C44.1154 40.7898 44.0141 40.5465 43.8338 40.3671C43.6534 40.1877 43.4089 40.087 43.1538 40.087Z"
        fill="white"
      />
      <Defs>
        <Filter
          id="filter0_d_cafe"
          x={0}
          y={0}
          width={68}
          height={83}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <FeFlood floodOpacity={0} result="BackgroundImageFix" />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset dy={4} />
          <FeGaussianBlur stdDeviation={2} />
          <FeComposite in2="hardAlpha" operator="out" />
          <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_cafe" />
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_cafe" result="shape" />
        </Filter>
      </Defs>
    </Svg>
  );
};

export default CafePinSvg;
