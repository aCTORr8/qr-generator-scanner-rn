import React, {useState, useRef} from 'react';
import {View, Text, Linking, Alert} from 'react-native';
import {Button, Dialog} from '@rneui/themed';
import styles from './../styles/Style';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

function QRscanner() {
  const [qrValue, setQrValue] = useState('');
  const [light, setLight] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const scannerRef = useRef(null);

  const handleLinkPress = async () => {
    try {
      await Linking.openURL(qrValue);
    } catch {
      Alert.alert('Недійсне посилання', 'Цей QR-код неможливо відкрити.');
    }
  };

  const isLink =
    qrValue.startsWith('http://') || qrValue.startsWith('https://');

  return (
    <View style={[styles.container, {paddingBottom: 126, margin: 0}]}>
      <QRCodeScanner
        ref={scannerRef}
        onRead={e => {
          setShowDialog(true);
          setQrValue(e.data);
        }}
        flashMode={
          light
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.auto
        }
        topContent={<></>}
        bottomContent={
          <Button
            title={`Flash ${light ? 'OFF' : 'ON'}`}
            icon={{...styles.iconButtonHome, size: 20, name: 'qr-code-scanner'}}
            iconContainerStyle={styles.iconButtonHomeContainer}
            titleStyle={{...styles.titleButtonHome, fontSize: 20}}
            buttonStyle={{...styles.buttonHome, height: 50}}
            containerStyle={{
              ...styles.buttonHomeContainer,
              marginTop: 120,
              marginBottom: 2,
            }}
            onPress={() => {
              setLight(!light);
            }}
          />
        }
      />
      <Dialog
        isVisible={showDialog}
        onBackdropPress={() => setShowDialog(!showDialog)}>
        <Dialog.Title
          titleStyle={{color: '#000', fontSize: 25}}
          title="Scanned QR:"
        />
        {isLink ? (
          <Text
            style={{
              color: 'blue',
              textDecorationLine: 'underline',
              fontSize: 25,
            }}
            onPress={handleLinkPress}
          >
            {qrValue}
          </Text>
        ) : (
          <Text style={{color: '#000', fontSize: 25}}>{qrValue}</Text>
        )}

        <Dialog.Actions>
          <Dialog.Button
            title="Scan Again"
            onPress={() => {
              if (scannerRef.current) {
                scannerRef.current.reactivate();
              }
              setShowDialog(false);
            }}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

export default QRscanner;
