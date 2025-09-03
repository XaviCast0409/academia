import { StyleSheet } from 'react-native';
import { designTokens } from './designTokens';

export const studyStyles = StyleSheet.create({
  // ============ LAYOUT PRINCIPAL ============
  container: {
    flex: 1,
    backgroundColor: designTokens.colors.surface,
  },
  
  content: {
    flex: 1,
    padding: designTokens.spacing.md,
  },
  
  scrollContent: {
    paddingBottom: designTokens.spacing.xxxl,
  },

  // ============ STUDY DECKS PAGE ============
  decksGrid: {
    paddingHorizontal: designTokens.spacing.sm,
  },
  
  deckCard: {
    backgroundColor: designTokens.colors.surface,
    borderRadius: designTokens.borderRadius.lg,
    padding: designTokens.spacing.lg,
    marginBottom: designTokens.spacing.md,
    borderWidth: 1,
    borderColor: designTokens.colors.border.light,
    ...designTokens.shadows.md,
  },
  
  deckCardPressed: {
    backgroundColor: designTokens.colors.surfaceSecondary,
    transform: [{ scale: 0.98 }],
  },
  
  deckHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: designTokens.spacing.sm,
  },
  
  deckIcon: {
    fontSize: designTokens.typography.fontSize.xxxl,
    marginRight: designTokens.spacing.md,
  },
  
  deckTitle: {
    fontSize: designTokens.typography.fontSize.lg,
    fontWeight: designTokens.typography.fontWeight.semibold,
    color: designTokens.colors.text.primary,
    flex: 1,
  },
  
  deckStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: designTokens.spacing.sm,
  },
  
  deckStat: {
    alignItems: 'center',
  },
  
  deckStatValue: {
    fontSize: designTokens.typography.fontSize.md,
    fontWeight: designTokens.typography.fontWeight.semibold,
    color: designTokens.colors.text.primary,
  },
  
  deckStatLabel: {
    fontSize: designTokens.typography.fontSize.xs,
    color: designTokens.colors.text.secondary,
    marginTop: 2,
  },
  
  deckDescription: {
    fontSize: designTokens.typography.fontSize.sm,
    color: designTokens.colors.text.secondary,
    marginTop: designTokens.spacing.sm,
    lineHeight: designTokens.typography.lineHeight.relaxed * designTokens.typography.fontSize.sm,
  },

  // ============ SESSION CONFIG ============
  configContainer: {
    backgroundColor: designTokens.colors.surface,
    borderRadius: designTokens.borderRadius.lg,
    padding: designTokens.spacing.lg,
    margin: designTokens.spacing.md,
    ...designTokens.shadows.md,
  },
  
  configTitle: {
    fontSize: designTokens.typography.fontSize.xl,
    fontWeight: designTokens.typography.fontWeight.bold,
    color: designTokens.colors.text.primary,
    textAlign: 'center',
    marginBottom: designTokens.spacing.lg,
  },
  
  timeOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: designTokens.spacing.xl,
  },
  
  timeOption: {
    width: '48%',
    backgroundColor: designTokens.colors.surfaceSecondary,
    borderRadius: designTokens.borderRadius.md,
    padding: designTokens.spacing.md,
    marginBottom: designTokens.spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  
  timeOptionSelected: {
    backgroundColor: designTokens.colors.primaryLight,
    borderColor: designTokens.colors.primary,
  },
  
  timeOptionTime: {
    fontSize: designTokens.typography.fontSize.lg,
    fontWeight: designTokens.typography.fontWeight.semibold,
    color: designTokens.colors.text.primary,
  },
  
  timeOptionReward: {
    fontSize: designTokens.typography.fontSize.sm,
    color: designTokens.colors.primary,
    fontWeight: designTokens.typography.fontWeight.medium,
    marginTop: 2,
  },

  // ============ STUDY TIMER ============
  timerContainer: {
    backgroundColor: designTokens.colors.surface,
    borderRadius: designTokens.borderRadius.lg,
    padding: designTokens.spacing.md,
    margin: designTokens.spacing.sm,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...designTokens.shadows.md,
  },
  
  timerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: designTokens.colors.primary,
    backgroundColor: designTokens.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  timerText: {
    fontSize: designTokens.typography.fontSize.lg,
    fontWeight: designTokens.typography.fontWeight.bold,
    color: designTokens.colors.primary,
  },
  
  timerLabel: {
    fontSize: designTokens.typography.fontSize.sm,
    color: designTokens.colors.text.secondary,
    textAlign: 'center',
    flex: 1,
    marginLeft: designTokens.spacing.md,
  },
  
  timerGoal: {
    fontSize: designTokens.typography.fontSize.sm,
    color: designTokens.colors.text.primary,
    fontWeight: designTokens.typography.fontWeight.medium,
    marginLeft: designTokens.spacing.md,
  },

  // ============ STUDY CARD (ANKI) ============
  cardContainer: {
    flex: 1,
    padding: designTokens.spacing.md,
  },
  
  cardProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: designTokens.spacing.md,
    paddingHorizontal: designTokens.spacing.sm,
  },
  
  cardProgressText: {
    fontSize: designTokens.typography.fontSize.sm,
    color: designTokens.colors.text.secondary,
  },
  
  cardMain: {
    flex: 1,
    backgroundColor: designTokens.colors.surface,
    borderRadius: designTokens.borderRadius.xl,
    padding: designTokens.spacing.xl,
    margin: designTokens.spacing.md,
    ...designTokens.shadows.xl,
    justifyContent: 'center',
    minHeight: 200,
  },
  
  cardQuestion: {
    fontSize: designTokens.typography.fontSize.lg,
    lineHeight: designTokens.typography.lineHeight.relaxed * designTokens.typography.fontSize.lg,
    color: designTokens.colors.text.primary,
    marginBottom: designTokens.spacing.lg,
    minHeight: 60,
    flexWrap: 'wrap',
    width: '100%',
  },
  
  cardDivider: {
    height: 1,
    backgroundColor: designTokens.colors.border.default,
    marginVertical: designTokens.spacing.lg,
  },
  
  cardAnswer: {
    fontSize: designTokens.typography.fontSize.md,
    lineHeight: designTokens.typography.lineHeight.relaxed * designTokens.typography.fontSize.md,
    color: designTokens.colors.text.secondary,
    minHeight: 40,
    flexWrap: 'wrap',
    width: '100%',
  },
  
  showAnswerButton: {
    backgroundColor: designTokens.colors.primary,
    borderRadius: designTokens.borderRadius.md,
    paddingVertical: designTokens.spacing.md,
    paddingHorizontal: designTokens.spacing.xl,
    alignSelf: 'center',
    marginTop: designTokens.spacing.lg,
  },
  
  showAnswerText: {
    color: designTokens.colors.text.inverse,
    fontSize: designTokens.typography.fontSize.md,
    fontWeight: designTokens.typography.fontWeight.semibold,
  },

  // ============ ANKI BUTTONS ============
  ankiButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: designTokens.spacing.md,
    paddingBottom: designTokens.spacing.xl,
    gap: designTokens.spacing.sm,
  },
  
  ankiButton: {
    flex: 1,
    paddingVertical: designTokens.spacing.md,
    borderRadius: designTokens.borderRadius.md,
    alignItems: 'center',
    ...designTokens.shadows.sm,
  },
  
  ankiButtonText: {
    color: designTokens.colors.text.inverse,
    fontSize: designTokens.typography.fontSize.sm,
    fontWeight: designTokens.typography.fontWeight.semibold,
  },

  // ============ ACTIONS ============
  actionButton: {
    backgroundColor: designTokens.colors.primary,
    borderRadius: designTokens.borderRadius.md,
    paddingVertical: designTokens.spacing.md,
    paddingHorizontal: designTokens.spacing.xl,
    alignItems: 'center',
    margin: designTokens.spacing.md,
    ...designTokens.shadows.md,
  },
  
  actionButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: designTokens.colors.primary,
  },
  
  actionButtonText: {
    color: designTokens.colors.text.inverse,
    fontSize: designTokens.typography.fontSize.md,
    fontWeight: designTokens.typography.fontWeight.semibold,
  },
  
  actionButtonTextSecondary: {
    color: designTokens.colors.primary,
  },

  // ============ RESULTS/REWARDS ============
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: designTokens.spacing.xl,
  },
  
  resultsIcon: {
    fontSize: 64,
    marginBottom: designTokens.spacing.lg,
  },
  
  resultsTitle: {
    fontSize: designTokens.typography.fontSize.xxxl,
    fontWeight: designTokens.typography.fontWeight.bold,
    color: designTokens.colors.text.primary,
    textAlign: 'center',
    marginBottom: designTokens.spacing.md,
  },
  
  resultsSubtitle: {
    fontSize: designTokens.typography.fontSize.lg,
    color: designTokens.colors.text.secondary,
    textAlign: 'center',
    marginBottom: designTokens.spacing.xl,
  },
  
  rewardCard: {
    backgroundColor: designTokens.colors.surface,
    borderRadius: designTokens.borderRadius.lg,
    padding: designTokens.spacing.lg,
    marginBottom: designTokens.spacing.md,
    width: '100%',
    ...designTokens.shadows.md,
  },
  
  rewardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: designTokens.spacing.sm,
  },
  
  rewardLabel: {
    fontSize: designTokens.typography.fontSize.md,
    color: designTokens.colors.text.secondary,
  },
  
  rewardValue: {
    fontSize: designTokens.typography.fontSize.lg,
    fontWeight: designTokens.typography.fontWeight.semibold,
    color: designTokens.colors.primary,
  },
  
  rewardTotal: {
    borderTopWidth: 1,
    borderTopColor: designTokens.colors.border.default,
    paddingTop: designTokens.spacing.sm,
    marginTop: designTokens.spacing.sm,
  },
  
  rewardTotalValue: {
    fontSize: designTokens.typography.fontSize.xl,
    fontWeight: designTokens.typography.fontWeight.bold,
    color: designTokens.colors.success,
  },

  // ============ EMPTY STATES ============
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: designTokens.spacing.xl,
  },
  
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: designTokens.spacing.lg,
  },
  
  emptyStateTitle: {
    fontSize: designTokens.typography.fontSize.xl,
    fontWeight: designTokens.typography.fontWeight.semibold,
    color: designTokens.colors.text.primary,
    textAlign: 'center',
    marginBottom: designTokens.spacing.md,
  },
  
  emptyStateText: {
    fontSize: designTokens.typography.fontSize.md,
    color: designTokens.colors.text.secondary,
    textAlign: 'center',
    lineHeight: designTokens.typography.lineHeight.relaxed * designTokens.typography.fontSize.md,
  },

  // ============ LOADING STATES ============
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  loadingText: {
    fontSize: designTokens.typography.fontSize.md,
    color: designTokens.colors.text.secondary,
    marginTop: designTokens.spacing.md,
  },

  // ============ ERROR STATES ============
  errorContainer: {
    backgroundColor: designTokens.colors.errorLight,
    borderRadius: designTokens.borderRadius.md,
    padding: designTokens.spacing.md,
    margin: designTokens.spacing.md,
    borderWidth: 1,
    borderColor: designTokens.colors.error,
  },
  
  errorText: {
    fontSize: designTokens.typography.fontSize.sm,
    color: designTokens.colors.error,
    textAlign: 'center',
  },

  // ============ RESPONSIVE BREAKPOINTS ============
  // Para tablets y pantallas grandes
  largeScreen: {
    maxWidth: 600,
    alignSelf: 'center',
  },
});
