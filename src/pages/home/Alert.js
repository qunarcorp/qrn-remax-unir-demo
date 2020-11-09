import { Platform, Alert as NativeAlert } from 'react-native';

const Alert = msg => {
  if (Platform.OS === 'web') {
    alert(msg);
    return;
  }

  NativeAlert.alert(msg);
};

export default Alert;
