
import { StyleSheet } from 'react-native';

const Colors = {
  grey: '#949494'
};

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 260,
    paddingTop: 60
  },
  headImage: {
    height: 200,
    width: '100%'
  },
  btnCon: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 50
  },
  btnText: {
    fontSize: 14,
    color: 'red'
  },
  tipCon: {
    padding: 10,
    marginTop: 20
  },
  tipText: {
    fontSize: 18
  }
});
