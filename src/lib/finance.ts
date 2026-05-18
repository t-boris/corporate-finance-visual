// ─────────────────────────────────────────────────────────────
// Финансовая математика. Все формулы — на чистом JS, без зависимостей.
// Используется в интерактивных explorers модулей и в quiz checker.
// ─────────────────────────────────────────────────────────────

/** Present Value of single future cash flow.  PV = FV / (1+r)^n */
export const presentValue = (fv: number, r: number, n: number) => fv / Math.pow(1 + r, n)

/** Future Value of single PV.  FV = PV * (1+r)^n */
export const futureValue = (pv: number, r: number, n: number) => pv * Math.pow(1 + r, n)

/** PV of ordinary annuity. C * [1 - (1+r)^-n] / r */
export const pvAnnuity = (c: number, r: number, n: number) =>
  r === 0 ? c * n : c * (1 - Math.pow(1 + r, -n)) / r

/** FV of ordinary annuity. C * [(1+r)^n - 1] / r */
export const fvAnnuity = (c: number, r: number, n: number) =>
  r === 0 ? c * n : c * (Math.pow(1 + r, n) - 1) / r

/** Perpetuity. PV = C / r */
export const perpetuity = (c: number, r: number) => c / r

/** Growing perpetuity (Gordon). PV = C / (r - g), r > g */
export const growingPerpetuity = (c: number, r: number, g: number) =>
  r > g ? c / (r - g) : Number.POSITIVE_INFINITY

/** NPV для произвольного массива cash flows. cf[0] — обычно отрицательное (инвестиция). */
export const npv = (cashFlows: number[], r: number) =>
  cashFlows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + r, t), 0)

/** IRR через бисекцию. Возвращает null если нет sign change или не сходится. */
export const irr = (cashFlows: number[], guessLo = -0.99, guessHi = 5, iters = 100): number | null => {
  let lo = guessLo, hi = guessHi
  const f = (r: number) => npv(cashFlows, r)
  let flo = f(lo), fhi = f(hi)
  if (flo * fhi > 0) return null
  for (let i = 0; i < iters; i++) {
    const mid = (lo + hi) / 2
    const fm = f(mid)
    if (Math.abs(fm) < 1e-9) return mid
    if (flo * fm < 0) { hi = mid; fhi = fm } else { lo = mid; flo = fm }
  }
  return (lo + hi) / 2
}

/** CAPM expected return.  E(R) = Rf + beta * (Rm - Rf) */
export const capm = (rf: number, beta: number, rm: number) => rf + beta * (rm - rf)

/** WACC = E/V * Re + D/V * Rd * (1 - Tc) */
export const wacc = (e: number, d: number, re: number, rd: number, tc: number) => {
  const v = e + d
  if (v === 0) return 0
  return (e / v) * re + (d / v) * rd * (1 - tc)
}

/** Форматирование валюты — без локали браузера, чтобы согласовать с курсом (USD). */
export const fmtUSD = (v: number, fractionDigits = 0) =>
  v.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })

export const fmtPct = (v: number, fractionDigits = 1) =>
  `${(v * 100).toFixed(fractionDigits)}%`
