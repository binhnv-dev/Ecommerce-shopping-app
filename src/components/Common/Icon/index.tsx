/**
 *
 * Icon
 *
 */

import React from 'react';
import {Svg, Path, Circle, G, Line, Polyline} from 'react-native-svg';

const BagIcon: React.FC<{ width: number, height: number, fill?: string}> = ({width, height, fill}) => {
  return (
    <Svg width={width} height={height} fill={fill} viewBox="0 0 512 512">
      <G>
        <Path d="m417.9,104.4h-65.5c-2.2-51-44.8-92.4-96.4-92.4s-94.2,41.3-96.5,92.4h-66.5l-30.1,395.6h386.2l-31.2-395.6zm-161.9-71.6c40.1,0 73.5,32 75.7,71.6h-151.4c2.2-39.6 35.6-71.6 75.7-71.6zm-143.3,92.4h46.7v68.5h20.8v-68.5h151.6v68.5h20.8v-68.5h47.8l27,354h-341.7l27-354z" />
      </G>
    </Svg>
  );
};

const BarsIcon: React.FC = () => {
  return <Svg className="bars-icon fa fa-bars" ariaHidden="true" />;
};

const CloseIcon: React.FC = () => {
  return <Svg className="close-icon" width={50} height={50} />;
};

const GoogleIcon: React.FC = () => {
  return (
    <Svg viewBox="0 0 533.5 544.3">
      <Path
        fill="#4285f4"
        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
      />
      <Path
        fill="#34a853"
        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
      />
      <Path
        fill="#fbbc04"
        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
      />
      <Path
        fill="#ea4335"
        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
      />
    </Svg>
  );
};

const FacebookIcon: React.FC = () => {
  return (
    <Svg fill="#3b5998" width="24" height="24" viewBox="0 0 24 24">
      <Path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
    </Svg>
  );
};

interface HeartIconProps {
  className?: string;
  filled?: boolean;
}

const HeartIcon: React.FC<HeartIconProps> = ({
  className = '',
  filled = false,
}) => {
  return (
    <Svg viewBox="467 392 58 57" width={58} height={57}>
      <G
        id="Group"
        fill="none"
        fillRule="evenodd"
        transform="translate(467 392)">
        <Path
          d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
          id="heart"
          fill={filled ? '#E2264D' : '#AAB8C2'}
        />
        <Circle
          id="main-circ"
          fill="#E2264D"
          opacity="0"
          cx="29.5"
          cy="29.5"
          r="1.5"
        />

        <G id="grp7" opacity="0" transform="translate(7 6)">
          <Circle id="oval1" fill="#FF6347" cx="2" cy="6" r="2" />
          <Circle id="oval2" fill="#FF4500" cx="5" cy="2" r="2" />
        </G>

        <G id="grp6" opacity="0" transform="translate(0 28)">
          <Circle id="oval1" fill="#FF6347" cx="2" cy="7" r="2" />
          <Circle id="oval2" fill="#FF4500" cx="3" cy="2" r="2" />
        </G>

        <G id="grp3" opacity="0" transform="translate(52 28)">
          <Circle id="oval2" fill="#FF6347" cx="2" cy="7" r="2" />
          <Circle id="oval1" fill="#FF4500" cx="4" cy="2" r="2" />
        </G>

        <G id="grp2" opacity="0" transform="translate(44 6)">
          <Circle id="oval2" fill="#FF6347" cx="5" cy="6" r="2" />
          <Circle id="oval1" fill="#FF4500" cx="2" cy="2" r="2" />
        </G>

        <G id="grp5" opacity="0" transform="translate(14 50)">
          <Circle id="oval1" fill="#FFA500" cx="6" cy="5" r="2" />
          <Circle id="oval2" fill="#FF6347" cx="2" cy="2" r="2" />
        </G>

        <G id="grp4" opacity="0" transform="translate(35 50)">
          <Circle id="oval1" fill="#FFA500" cx="6" cy="5" r="2" />
          <Circle id="oval2" fill="#FF6347" cx="2" cy="2" r="2" />
        </G>

        <G id="grp1" opacity="0" transform="translate(24)">
          <Circle id="oval1" fill="#FFA500" cx="2.5" cy="3" r="2" />
          <Circle id="oval2" fill="#FF6347" cx="7.5" cy="2" r="2" />
        </G>
      </G>
    </Svg>
  );
};

interface XIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const XIcon: React.FC<XIconProps> = ({
  width = 20,
  height = 20,
  color = 'currentColor',
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <Line x1="18" y1="6" x2="6" y2="18" />
      <Line x1="6" y1="6" x2="18" y2="18" />
    </Svg>
  );
};

interface ReviewIconProps {
  width?: number;
  height?: number;
  style?: any;
}

const ReviewIcon: React.FC<ReviewIconProps> = ({
  width = '60',
  height = '60',
  style = {},
}) => {
  return (
    <Svg width={width} height={height} style={style} viewBox="0 0 512 512">
      <Path
        d="m151.632 106h-45.632-44.604l-30.396 15v255l28.658 15h46.342 60l15-15v-255z"
        fill="#ffdf40"
      />
      <Path d="m181 376v-255l-29.368-15h-45.632v285h60z" fill="#ffbe40" />
      <Path
        d="m436 61h-90-90c-24.814 0-45 20.186-45 45v120c0 24.814 20.186 45 45 45h15v45c0 6.064 3.647 11.543 9.258 13.857 5.533 2.309 12.023 1.071 16.348-3.252l49.394-49.394 6.211-6.211h83.789c24.814 0 45-20.186 45-45v-120c0-24.814-20.186-45-45-45z"
        fill="#7ed96c"
      />
      <Path
        d="m436 271c24.814 0 45-20.186 45-45v-120c0-24.814-20.186-45-45-45h-90v216.211l6.211-6.211z"
        fill="#48b348"
      />
      <Path d="m106 106h-15v300h15 15v-300z" fill="#ffbe40" />
      <Path d="m106 106h15v300h-15z" fill="#ff9f40" />
      <Path
        d="m386.605 140.395c-5.859-5.859-15.352-5.859-21.211 0l-19.394 19.394-15 15-11.895-11.895c-5.859-5.859-15.352-5.859-21.211 0s-5.859 15.352 0 21.211l22.5 22.5c2.93 2.93 6.768 4.395 10.605 4.395s7.676-1.465 10.605-4.395l4.395-4.395 40.605-40.605c5.861-5.859 5.861-15.351.001-21.21z"
        fill="#f9f4f3"
      />
      <Path
        d="m386.605 140.395c-5.859-5.859-15.352-5.859-21.211 0l-19.394 19.394v42.422l40.605-40.605c5.86-5.86 5.86-15.352 0-21.211z"
        fill="#f0e6e1"
      />
      <Path
        d="m166 0h-60-60c-8.291 0-15 6.709-15 15v76l25.421 15h49.579 45.632l29.368-15v-76c0-8.291-6.709-15-15-15z"
        fill="#ff6673"
      />
      <Path
        d="m181 91v-76c0-8.291-6.709-15-15-15h-60v106h45.632z"
        fill="#e62e2e"
      />
      <Path
        d="m106 376h-75c0 2.329.542 4.629 1.582 6.709l60 121c2.549 5.083 7.734 8.291 13.418 8.291s10.869-3.208 13.418-8.291l60-121c1.04-2.08 1.582-4.38 1.582-6.709z"
        fill="#ffebdc"
      />
      <Path
        d="m119.418 503.709 60-121c1.04-2.08 1.582-4.38 1.582-6.709h-75v136c5.684 0 10.869-3.208 13.418-8.291z"
        fill="#ffd2c8"
      />
      <Path d="m106 91h-75v30h75 75v-30z" fill="#4d6699" />
      <Path d="m106 91h75v30h-75z" fill="#404b80" />
    </Svg>
  );
};

interface TrashIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const TrashIcon: React.FC<TrashIconProps> = ({
  className = '',
  width = 20,
  height = 20,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <Polyline points="3 6 5 6 21 6" />
      <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </Svg>
  );
};

interface RefreshIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const RefreshIcon: React.FC<RefreshIconProps> = ({
  className = '',
  width = 20,
  height = 20,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <Polyline points="23 4 23 10 17 10" />
      <Polyline points="1 20 1 14 7 14" />
      <Path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </Svg>
  );
};

interface CheckIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const CheckIcon: React.FC<CheckIconProps> = ({
  className = '',
  width = 24,
  height = 24,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <Polyline points="22 4 12 14.01 9 11.01" />
    </Svg>
  );
};

export {
  BagIcon,
  BarsIcon,
  CloseIcon,
  GoogleIcon,
  FacebookIcon,
  HeartIcon,
  XIcon,
  ReviewIcon,
  TrashIcon,
  RefreshIcon,
  CheckIcon,
};
