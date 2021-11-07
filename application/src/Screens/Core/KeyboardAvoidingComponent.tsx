import React from 'react';
import { Platform, SafeAreaView, ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import StaticSafeAreaInsets from "react-native-static-safe-area-insets";

class KeyboardAvoidingComponent extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        if (Platform.OS === 'android') {
            return <ScrollView>{this.props.children}</ScrollView>;
        }
        let verticalOffset = StaticSafeAreaInsets.safeAreaInsetsTop + StaticSafeAreaInsets.safeAreaInsetsBottom + 40;
        return (
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={verticalOffset}>
                <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={false} keyboardShouldPersistTaps={'always'}>
                    {this.props.children}
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

export { KeyboardAvoidingComponent };