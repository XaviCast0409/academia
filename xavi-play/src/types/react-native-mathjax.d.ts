declare module "react-native-mathjax" {
  import * as React from "react";
  import { ViewStyle } from "react-native";

  interface MathJaxProps {
    html: string;
    mathJaxOptions?: object;
    style?: ViewStyle;
  }

  export default class MathJax extends React.Component<MathJaxProps> {}
}
