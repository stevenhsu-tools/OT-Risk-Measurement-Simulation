/**
 * Shared calculation formulas used by both the app (editors) and the seed-data generator script,
 * so the two can never drift out of sync.
 */

/**
 * Calibrated-lognormal mode estimate — derives a single "Most Likely" point estimate from a
 * Min/Max range.
 *
 * Method: treat Min and Max as the 5th and 95th percentiles (a 90% confidence interval) of a
 * lognormal distribution, then return that distribution's mode. This is the standard technique
 * used in quantitative risk analysis (e.g. Douglas Hubbard's calibrated-estimation approach and
 * the FAIR model) for turning a "low/high" range into a most-likely value, and is preferred over
 * a plain arithmetic average because frequency and loss magnitudes are typically right-skewed
 * (many small/likely outcomes, a long tail of rare/large ones) — a symmetric average would
 * overstate the central estimate.
 *
 * Derivation: for a lognormal(mu, sigma), the 5th/95th percentiles are
 * exp(mu -/+ 1.645*sigma). Solving for mu and sigma from ln(min)/ln(max):
 *   mu    = (ln(min) + ln(max)) / 2
 *   sigma = (ln(max) - ln(min)) / (2 * 1.645) = (ln(max) - ln(min)) / 3.29
 * The mode of a lognormal distribution is exp(mu - sigma^2), which gives the formula below.
 */
export function lognormalMostLikely(min: number, max: number): number {
    if (min <= 0 || max <= 0) return Math.max(min, max, 0);
    const lnMin = Math.log(min);
    const lnMax = Math.log(max);
    const sigma = (lnMax - lnMin) / 3.29;
    return Math.exp((lnMax + lnMin) / 2 - sigma * sigma);
}
