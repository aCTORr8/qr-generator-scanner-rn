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

  const handleScanAgain = () => {
    if (scannerRef.current) {
      scannerRef.current.reactivate();
    }
    setShowDialog(false);
  };

  const isLink =
    qrValue.startsWith('http://') || qrValue.startsWith('https://');

  return (
    <View style={styles.scannerContainer}>
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
            icon={{...styles.iconButtonSmall, name: 'qr-code-scanner'}}
            iconContainerStyle={styles.iconButtonHomeContainer}
            titleStyle={styles.titleButtonSmall}
            buttonStyle={styles.buttonSmall}
            containerStyle={styles.buttonScannerContainer}
            onPress={() => setLight(!light)}
          />
        }
      />
      <Dialog
        isVisible={showDialog}
        onBackdropPress={() => setShowDialog(false)}>
        <Dialog.Title titleStyle={styles.dialogTitle} title="Scanned QR:" />
        {isLink ? (
          <Text style={styles.linkText} onPress={handleLinkPress}>
            {qrValue}
          </Text>
        ) : (
          <Text style={styles.qrText}>{qrValue}</Text>
        )}
        <Dialog.Actions>
          <Dialog.Button title="Scan Again" onPress={handleScanAgain} />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

export default QRscanner;
