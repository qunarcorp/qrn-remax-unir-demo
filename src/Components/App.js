import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Counter from "./Counter";

export default class App extends React.Component {

    render() {
        /**
         * 这里展示按平台拆分分支代码
         * 产物： if(true){str='web!web!';}else {}
         */
        let str = 'rn'
        if (process.env.RUNTIME_ENV === 'web'){
            str = 'web'
        }
        if ( process.env.RUNTIME_ENV === 'wechat' ){
            str = 'Wechat'
        }
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>这里是{str}端的功能</Text>
                <Counter />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
