import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
  enableLogging,
} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React from 'react';
import {
  Keyboard,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const refModalNormal = React.createRef<BottomSheetModal>();
const refModalKeyboard = React.createRef<BottomSheetModal>();
const refTextInput = React.createRef<TextInput>();

enableLogging();
const backdropComponent = (props: BottomSheetDefaultBackdropProps) => {
  const {onPress: onPressProps} = props;

  const onPress = () => {
    if (Platform.OS === 'ios') {
      Keyboard.dismiss();
    }

    onPressProps && onPressProps();
  };

  return (
    <BottomSheetBackdrop
      {...props}
      onPress={onPress}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  );
};

const onDismiss = () => {
  refTextInput.current?.focus();
};

const BottomSheetNormal = () => {
  return (
    <BottomSheetModal
      ref={refModalNormal}
      {...{
        snapPoints: [400],
        stackBehavior: 'push',
        enablePanDownToClose: true,
        backdropComponent,
        onDismiss,
        style: {padding: 20},
      }}>
      <Text>Some modal</Text>
    </BottomSheetModal>
  );
};

const BottomSheetKeyboard = () => {
  return (
    <BottomSheetModal
      ref={refModalKeyboard}
      {...{
        snapPoints: [200],
        stackBehavior: 'push',
        android_keyboardInputMode: 'adjustResize',
        enablePanDownToClose: true,
        backdropComponent,
        onDismiss,
        style: {padding: 20},
      }}>
      <BottomSheetTextInput
        style={{backgroundColor: '#f3f3f3', padding: 10, marginBottom: 10}}
        ref={refTextInput}
        placeholder="some text"
      />
      <Pressable
        onPress={() => {
          refTextInput.current?.blur();
          refModalNormal.current?.present();
        }}>
        <Text>Open normal modal</Text>
      </Pressable>
    </BottomSheetModal>
  );
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />

        <View style={{padding: 20}}>
          <Pressable
            onPress={() => {
              refModalKeyboard.current?.present();
              refTextInput.current?.focus();
            }}>
            <Text>Open modal</Text>
          </Pressable>
        </View>

        <BottomSheetModalProvider>
          <BottomSheetKeyboard />
          <BottomSheetNormal />
        </BottomSheetModalProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
