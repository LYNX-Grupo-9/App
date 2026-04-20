import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export const common = StyleSheet.create({

  // ─── Layout ───────────────────────────────────────────────────────────────

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  padding: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaced: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },


  // ─── Typography ───────────────────────────────────────────────────────────

  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  sectionLabel: {
    fontSize: 10,
    color: '#999',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nameHighlight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.navy,
    marginTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 20,
  },
  subtitleGray: {
    color: '#999',
    fontSize: 16,
  },
  dateText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  smallGrayText: {
    color: COLORS.gray,
    fontSize: 12,
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },


  // ─── Text colours (reusable inline) ──────────────────────────────────────

  txtWhite: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  txtGray: {
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  txtTeal: {
    color: COLORS.teal,
    fontWeight: 'bold',
  },
  txtBlack: {
    color: '#000',
  },
  txtNavyBold: {
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  txtCenteredBold: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.navy,
    fontSize: 16,
  },


  // ─── Headers ─────────────────────────────────────────────────────────────

  headerHome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  headerSimple: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  headerChat: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },


  // ─── Avatars ─────────────────────────────────────────────────────────────

  avatarSm: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.navy,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarMd: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitialsSm: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  avatarInitialsMd: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  avatarInitialsLg: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 32,
  },
  avatarMini: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarMiniText: {
    fontSize: 8,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },


  // ─── Buttons ─────────────────────────────────────────────────────────────

  btnPrimary: {
    backgroundColor: COLORS.navy,
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnSecondary: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 10,
  },
  btnTealLight: {
    backgroundColor: '#E0F2F1',
    padding: 12,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  btnSmallChat: {
    flex: 1,
    backgroundColor: COLORS.navy,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnMiniChat: {
    backgroundColor: COLORS.teal,
    padding: 8,
    borderRadius: 8,
  },
  btnNewCase: {
    backgroundColor: COLORS.teal,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  btnNewCaseText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  btnOk: {
    backgroundColor: COLORS.blue,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnSendDoc: {
    backgroundColor: COLORS.navy,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },


  // ─── Tags / Pills ─────────────────────────────────────────────────────────

  tagArea: {
    backgroundColor: '#F0F9F9',
    padding: 4,
    borderRadius: 4,
  },
  tagAreaText: {
    fontSize: 10,
    color: COLORS.teal,
    fontWeight: 'bold',
  },
  tagStatus: {
    backgroundColor: '#E8F5E9',
    padding: 4,
    borderRadius: 4,
  },
  tagStatusText: {
    fontSize: 10,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  tagStatusGreen: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  tagGray: {
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagGrayText: {
    color: COLORS.gray,
    fontWeight: 'bold',
    fontSize: 12,
  },
  tagProbability: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  tagProbabilityText: {
    fontSize: 12,
    fontWeight: 'bold',
  },


  // ─── Badge (unread count pill) ────────────────────────────────────────────

  badge: {
    backgroundColor: COLORS.teal,
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },


  // ─── Cards (shared structure) ─────────────────────────────────────────────

  cardBase: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.teal,
    padding: 15,
    marginBottom: 15,
  },
  cardImpact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEE',
    borderLeftWidth: 5,
    borderLeftColor: COLORS.teal,
    marginVertical: 20,
  },
  cardImpactIcon: {
    backgroundColor: '#E0F2F1',
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  cardAbout: {
    backgroundColor: '#F0F2F5',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  cardDocument: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 12,
    padding: 15,
    alignSelf: 'flex-start',
    width: '80%',
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.teal,
  },
  cardAnonymous: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    marginTop: 20,
  },


  // ─── AI Card ──────────────────────────────────────────────────────────────

  cardAI: {
    backgroundColor: COLORS.navy,
    padding: 20,
    borderRadius: 15,
    marginVertical: 20,
  },
  cardAIRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardAITitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cardAIText: {
    color: COLORS.white,
    fontSize: 13,
    lineHeight: 18,
  },
  cardAILink: {
    color: COLORS.tealLight,
    fontWeight: 'bold',
    marginTop: 15,
  },


  // ─── Modal ────────────────────────────────────────────────────────────────

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    backgroundColor: COLORS.white,
    width: '85%',
    borderRadius: 20,
    padding: 25,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: COLORS.navy,
  },
  modalText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
    textAlign: 'justify',
  },
  modalWarning: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.teal,
    textAlign: 'center',
    marginVertical: 20,
  },


  // ─── Search bar ───────────────────────────────────────────────────────────

  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#F0F2F5',
    margin: 20,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
  },


  // ─── Filter pills row ─────────────────────────────────────────────────────

  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 15,
  },
  filterActive: {
    backgroundColor: COLORS.navy,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  filterInactive: {
    backgroundColor: '#F0F2F5',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },


  // ─── Chat bubbles ─────────────────────────────────────────────────────────

  bubbleLeft: {
    backgroundColor: '#F0F2F5',
    padding: 15,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    alignSelf: 'flex-start',
    maxWidth: '80%',
    marginBottom: 15,
    marginTop: 15,
  },
  bubbleRight: {
    backgroundColor: COLORS.teal,
    padding: 15,
    borderRadius: 15,
    borderTopRightRadius: 0,
    alignSelf: 'flex-end',
    maxWidth: '80%',
    marginBottom: 15,
  },
  bubbleTime: {
    fontSize: 10,
    color: '#AAA',
    textAlign: 'right',
    marginTop: 5,
  },
  bubbleTimeWhite: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'right',
    marginTop: 5,
  },
  chatDateSeparator: {
    alignItems: 'center',
    marginVertical: 15,
  },
  chatName: {
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  chatStatus: {
    fontSize: 12,
    color: '#4CAF50',
  },


  // ─── Stars row ────────────────────────────────────────────────────────────

  starsRowLarge: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 20,
  },


  // ─── Rating / Success ─────────────────────────────────────────────────────

  commentInput: {
    backgroundColor: '#F0F2F5',
    borderRadius: 12,
    padding: 15,
    height: 120,
    textAlignVertical: 'top',
    marginTop: 10,
  },
  successCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E1F5FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5,
  },
  ratingResultCard: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.star,
    padding: 18,
    marginBottom: 24,
  },


  // ─── User Profile screen ──────────────────────────────────────────────────

  profileBanner: {
    backgroundColor: COLORS.navy,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
  },
  profileAvatarLarge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.teal,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.tealLight,
    marginBottom: 12,
  },
  profileSinceTag: {
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    overflow: 'hidden',
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 18,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.gray,
    marginTop: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 1,
  },
  recentLawyerCard: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    padding: 14,
    marginRight: 12,
    width: 100,
  },
  recentLawyerName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.navy,
    marginTop: 8,
    textAlign: 'center',
  },
  recentLawyerArea: {
    fontSize: 10,
    color: COLORS.teal,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 2,
  },


  // ─── Document row (MyCases) ───────────────────────────────────────────────

  documentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
  },
  documentText: {
    fontSize: 13,
    color: COLORS.navy,
  },
  documentLabel: {
    fontSize: 10,
    color: COLORS.gray,
  },
  documentName: {
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  documentRowInChat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

});