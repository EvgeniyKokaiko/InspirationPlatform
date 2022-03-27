import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

type IProps = {
    text?: string;
    fontSize?: number;
    styles?: {
      text?: {};
      container?: {};
    };
    defaultText: string;
};

type IState = {
    text: string;
}

const LabelView = (props: IProps) => {
    const [getState, setState] = useState<IState>({
        text: props.defaultText,
    })


    useEffect(() => {
        if (props.defaultText !== void 0 && props.defaultText !== getState.text) {
            setState({...getState, text: props.defaultText})
        }
    }, [props.defaultText])

    return (
        <View style={[props.styles?.container]}>
        <Text style={[{ color: 'white' }, props.fontSize ? { fontSize: props.fontSize } : { fontSize: 40 }, props.styles?.text]}>
          {getState.text}
        </Text>
      </View>
    )
}



export {LabelView}