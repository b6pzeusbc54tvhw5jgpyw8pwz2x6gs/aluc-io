import theme from "_src/theme/theme.yaml"
import { createSelector } from 'reselect'

export const isWideScreenSelector = createSelector(
  state => (state.windowSize || {}).width || -1,
  () => theme.mediaQueryTresholds.L,
  (width, mediaQueryL) => {
    if (typeof window === `undefined`) {
      return false
    }
    return width >= mediaQueryL
  }
)
