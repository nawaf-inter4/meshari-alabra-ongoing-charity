import { ReactNode } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { isTablet, isTV, isWatch } from '../utils/responsive';

interface ResponsiveWrapperProps {
  children: ReactNode;
  phoneStyle?: any;
  tabletStyle?: any;
  tvStyle?: any;
  watchStyle?: any;
}

export function ResponsiveWrapper({ children, phoneStyle, tabletStyle, tvStyle, watchStyle }: ResponsiveWrapperProps) {
  const { width } = useWindowDimensions();
  
  let style = phoneStyle;
  
  if (isWatch) {
    style = watchStyle || phoneStyle;
  } else if (isTV) {
    style = tvStyle || tabletStyle || phoneStyle;
  } else if (isTablet) {
    style = tabletStyle || phoneStyle;
  }
  
  return <View style={style}>{children}</View>;
}
