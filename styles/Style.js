import {StyleSheet} from 'react-native';

const COLORS = {
  primary: 'rgba(140, 233, 176, 1)',
  black: '#000',
  white: 'white',
  link: 'blue',
  transparent: 'transparent',
};

const SIZES = {
  qrCode: 200,
  logoSize: 60,
  iconSmall: 20,
  iconMedium: 24,
  iconLarge: 50,
  buttonSmall: 50,
  buttonLarge: 100,
  fontSmall: 18,
  fontMedium: 20,
  fontLarge: 25,
};

const SPACING = {
  marginSmall: 2,
  marginMedium: 10,
  marginLarge: 40,
  scannerTopMargin: 120,
  scannerPaddingBottom: 126,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
  },
  scannerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: SPACING.scannerPaddingBottom,
    margin: 0,
  },
  iconButtonHomeContainer: {marginRight: 10},
  iconButtonHome: {
    type: 'material',
    size: SIZES.iconLarge,
    color: COLORS.white,
  },
  iconButtonSmall: {
    type: 'material',
    size: SIZES.iconSmall,
    color: COLORS.white,
  },
  titleButtonHome: {
    fontWeight: '700',
    fontSize: SIZES.fontLarge,
  },
  titleButtonSmall: {
    fontWeight: '700',
    fontSize: SIZES.fontMedium,
  },
  buttonHome: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.transparent,
    borderWidth: 0,
    borderRadius: 30,
    height: SIZES.buttonLarge,
  },
  buttonSmall: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.transparent,
    borderWidth: 0,
    borderRadius: 30,
    height: SIZES.buttonSmall,
  },
  buttonHomeContainer: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 20,
  },
  buttonShareContainer: {
    width: 200,
    marginHorizontal: 50,
    marginTop: SPACING.marginLarge,
    marginBottom: SPACING.marginMedium,
  },
  buttonDownloadContainer: {
    width: 200,
    marginHorizontal: 50,
    marginTop: SPACING.marginMedium,
    marginBottom: SPACING.marginMedium,
  },
  buttonScannerContainer: {
    width: 200,
    marginHorizontal: 50,
    marginTop: SPACING.scannerTopMargin,
    marginBottom: SPACING.marginSmall,
  },
  dialogTitle: {
    color: COLORS.black,
    fontSize: SIZES.fontLarge,
  },
  dialogText: {
    color: COLORS.black,
    fontSize: SIZES.fontSmall,
  },
  qrText: {
    color: COLORS.black,
    fontSize: SIZES.fontLarge,
  },
  linkText: {
    color: COLORS.link,
    textDecorationLine: 'underline',
    fontSize: SIZES.fontLarge,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export {COLORS, SIZES, SPACING};
export default styles;
