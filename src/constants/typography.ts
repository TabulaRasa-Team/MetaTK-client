import { FONTS } from '../constants/fonts';
import { fontScale } from '../utils/scaler';

export const TYPOGRAPHY = {
  SUB_TITLE: {
    fontSize: fontScale(31.48),
    fontFamily: FONTS.EXTRABOLD,
  },
  HEADLINE_1: {
    fontSize: fontScale(24),
    fontFamily: FONTS.BOLD,
  },
  HEADLINE_2: {
    fontSize: fontScale(16),
    fontFamily: FONTS.BOLD,
  },
  HEADLINE_3: {
    fontSize: fontScale(12),
    fontFamily: FONTS.BOLD,
  },
  SECTION_1: {
    fontSize: fontScale(16),
    fontFamily: FONTS.REGULAR,
  },
  SECTION_2: {
    fontSize: fontScale(14),
    fontFamily: FONTS.REGULAR,
  },
  DOCS_1: {
    fontSize: fontScale(12),
    fontFamily: FONTS.REGULAR,
  }
}
