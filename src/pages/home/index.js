import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';

/**
 * App.js 有专门Web端用的App.web.js ,
 * 会多一个 计数器组件
 * 使用时 RN端用 App.js web端用 App.web.js
 */
import App from '../../Components/App';

class Home extends React.Component {
  static routerPlugin = {
    title: 'Home'
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.tipText}> !!下方引入的是App.js</Text>
          <Text style={styles.tipText}> App.js有专门wechat端用的App.wechat.js </Text>
          <Text style={styles.tipText}> web和RN会多一个计数器组件 </Text>
          <Text style={styles.tipText}> 用来区分不同端需要不同表现时的例子</Text>
          <App/>
        </View>
      </ScrollView>
    );
  }
}

export default Home;
