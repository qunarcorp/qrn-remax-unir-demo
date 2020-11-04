/**
 * 这是一个纯的WEB端组件，只能在WEB端用
 */
import React from 'react'
import {View, TouchableOpacity, Text} from "react-native";

class Counter extends React.Component {
    state = {
        count: 1
    }
    increment = () => {
        this.setState((state) => {
            return {count: state.count + 1}
        })
    }

    decrement = () => {
        if(this.state.count>0){
            this.setState((state) => {
                return {count: state.count - 1}
            })
        }
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.decrement()
        }, 3000)
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        const {count} = this.state
        let leftBtn, rightBtn
        if (count >= 0) {
            leftBtn = <TouchableOpacity onPress={this.decrement}><Text>-</Text></TouchableOpacity>
        }

        if (count <= 0) {
            rightBtn =
                <TouchableOpacity style={{color: 'blue'}} onPress={this.increment}><Text>+</Text></TouchableOpacity>
        } else {
            rightBtn =
                <TouchableOpacity style={{color: 'red'}} onPress={this.increment}><Text>+</Text></TouchableOpacity>
        }

        return (
            <View>
                <Text>计数器</Text>
                <View>
                    {leftBtn}
                    <Text>{count}</Text>
                    {rightBtn}
                </View>
            </View>
        )
    }
}

export default Counter
