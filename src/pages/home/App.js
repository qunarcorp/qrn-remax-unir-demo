import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    FlatList,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import Alert from './Alert';

const isRN = process.env.RUNTIME_ENV !== 'web' && process.env.RUNTIME_ENV !== 'wechat';

class Home extends Component {
    state = {
        tasks: [],
        text: '',
        initiator: false,
    };

    changeTextHandler = text => {
        this.setState({text: text});
    };

    addTask = () => {
        if (this.state.text.length <= 5) {
            Alert('Todo item cannot be less than 5 characters');
            return;
        }
        this.setState(prevState => {
            const item = {
                text: prevState.text,
                completed: false,
            };

            return {
                tasks: [...prevState.tasks, item],
                text: '',
                initiator: true,
            };
        });

    };

    markComplete = i => {
        this.setState(prevState => {
            prevState.tasks[i].completed = !prevState.tasks[i].completed;
            return {tasks: [...prevState.tasks]};
        });
    };

    componentDidMount() {

    }

    render() {
        console.log('RUNTIME_ENV', process.env.RUNTIME_ENV);
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#F5FCFF', width: '100%'}}>
                <View style={[styles.container]}>
                    <FlatList
                        style={styles.list}
                        data={this.state.tasks}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={() => (<View style={styles.header}><Image style={styles.logo} source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png'
                        }}/>
                            <View><Text style={styles.title}>Todo List</Text></View></View>)
                        }
                        renderItem={({item, index}) => (
                            <View style={styles.itemContainer}>
                                <View style={styles.listItemCont}>
                                    <Text
                                        style={[
                                            styles.listItem,
                                            item.completed && {textDecorationLine: 'line-through'},
                                        ]}
                                        numberOfLines={1}
                                    >
                                        {item.text}
                                    </Text>
                                    {(
                                        <TouchableOpacity style={styles.checkButton}
                                                          onPress={() => this.markComplete(index)}
                                        >
                                            <Text
                                                style={!item.completed ? styles.checkButtonOn : styles.checkButtonOff}>{!item.completed ? 'Doing' : 'Done'}</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                        )}
                        ListFooterComponent={() => {
                            return null
                        }}
                    />
                </View>
                <TextInput
                    style={styles.textInput}
                    onChangeText={this.changeTextHandler}
                    onSubmitEditing={this.addTask}
                    value={this.state.text}
                    placeholder="Add Tasks"
                    returnKeyType="done"
                    returnKeyLabel="done"
                    placeholderTextColor="#aaa"
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#323239',
        height: isRN?'90%':'90vh',
        width: '100%',
    },
    list: {
        flex: 1,
        width: '100%',

    },
    title: {
        marginTop: 40,
        textAlign: 'center',
        fontSize: 40,
        color: 'rgb(169,108,59)',
    },
    header: {
        alignItems: 'center',
        marginTop: 50,
        fontSize: 40,
        width: '100%'
    },
    listItem: {
        fontSize: 18,
        width: '70%',
        color: 'rgb(169,108,59)',
    },
    checkButton: {
        width: '30%',
    },
    checkButtonOn: {
        margin: 0,
        color: 'rgb(13,189,12)',
    },
    checkButtonOff: {
        margin: 0,
        color: 'grey',
    },
    itemContainer: {
        paddingHorizontal: 60
    },
    listItemCont: {
        marginTop: 20,
        width: '100%',
        height: 60,
        paddingLeft: 30,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'rgb(169,108,59)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textInput: {
        bottom: 0,
        left: 0,
        right: 0,
        height: isRN?'10%':'10vh',
        paddingRight: 10,
        width: '100%',
    },
    logo: {
        width: 86,
        height: 78,
    },
});
export default Home;
