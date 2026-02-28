import React, {useState} from 'react';
import {View, Platform, PermissionsAndroid, Text, Alert} from 'react-native';
import {Button, Icon, Input, Dialog} from '@rneui/themed';
import styles, {COLORS, SIZES} from './../styles/Style';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';

const createShareData = data => ({
  title: 'QR',
  message: 'Here is my QR code!',
  url: `data:image/jpeg;base64,${data}`,
});

function QRgenerator() {
  const [qrValue, setQrValue] = useState('');
  const [qrImage, setQrImage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const shareQR = () => {
    qrImage.toDataURL(data => {
      const shareData = createShareData(data);
      setQrImage(String(shareData.url));
      Share.open(shareData);
    });
  };

  const downloadQR = () => {
    setShowDialog(true);
    setLoading(true);
    qrImage.toDataURL(async data => {
      const shareData = createShareData(data);
      setQrImage(String(shareData.url));

      if (Platform.OS === 'ios') {
        saveImage(String(shareData.url));
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'App needs access to your storage to download the QR code image',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            saveImage(String(shareData.url));
          } else {
            setLoading(false);
            setShowDialog(false);
            Alert.alert(
              'Permission Denied',
              'Cannot save QR code without storage permission.',
            );
          }
        } catch {
          setLoading(false);
          setShowDialog(false);
          Alert.alert('Error', 'Failed to request storage permission.');
        }
      }
    });
  };

  const saveImage = qr => {
    setLoading(false);
    const base64Data = qr.split('data:image/jpeg;base64,')[1];

    const date = new Date();
    const {fs} = RNFetchBlob;
    const filename = `/qr_${Math.floor(date.getTime() + date.getSeconds() / 2)}.jpeg`;
    const picturePath = fs.dirs.DownloadDir + filename;

    fs.writeFile(picturePath, base64Data, 'base64')
      .then(() => {
        RNFetchBlob.android.addCompleteDownload({
          title: 'Here is your QR code!',
          useDownloadManager: true,
          showNotification: true,
          notification: true,
          path: picturePath,
          mime: 'image/jpeg',
          description: 'Image',
        });
      })
      .catch(() => {
        setShowDialog(false);
        Alert.alert('Error', 'Failed to save QR code.');
      });
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Type your text here..."
        onChangeText={setQrValue}
        leftIcon={
          <Icon
            name="qr-code"
            type="material"
            size={SIZES.iconMedium}
            color={COLORS.primary}
          />
        }
      />
      <QRCode
        value={qrValue || 'QR'}
        size={SIZES.qrCode}
        logoSize={SIZES.logoSize}
        logoBackgroundColor={COLORS.transparent}
        getRef={setQrImage}
      />
      <Button
        title="Share QR"
        icon={{...styles.iconButtonSmall, name: 'share'}}
        iconContainerStyle={styles.iconButtonHomeContainer}
        titleStyle={styles.titleButtonSmall}
        buttonStyle={styles.buttonSmall}
        containerStyle={styles.buttonShareContainer}
        onPress={shareQR}
      />
      <Button
        title="Download"
        icon={{...styles.iconButtonSmall, name: 'file-download'}}
        iconContainerStyle={styles.iconButtonHomeContainer}
        titleStyle={styles.titleButtonSmall}
        buttonStyle={styles.buttonSmall}
        containerStyle={styles.buttonDownloadContainer}
        onPress={downloadQR}
      />
      <Dialog
        isVisible={showDialog}
        onBackdropPress={() => setShowDialog(false)}>
        {loading ? (
          <Dialog.Loading />
        ) : (
          <>
            <Dialog.Title titleStyle={styles.dialogTitle} title="Download QR" />
            <Text style={styles.dialogText}>
              Your QR code has been downloaded successfully. Check it on your{' '}
              <Text style={styles.boldText}>Downloads</Text> folder.
            </Text>
          </>
        )}
      </Dialog>
    </View>
  );
}

export default QRgenerator;
