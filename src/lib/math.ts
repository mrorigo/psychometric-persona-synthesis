/**
 * Samples from a Standard Normal Distribution N(0, 1) 
 * using the Box-Muller transform.
 */
export function sampleNormal(): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/**
 * Performs Cholesky Decomposition on a symmetric positive-definite matrix.
 * Returns the lower triangular matrix L such that A = LL^T.
 */
export function cholesky(matrix: number[][]): number[][] {
    const n = matrix.length;
    const l: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            let sum = 0;
            for (let k = 0; k < j; k++) {
                sum += l[i]![k]! * l[j]![k]!;
            }


            if (i === j) {
                l[i]![j] = Math.sqrt(matrix[i]![i]! - sum);
            } else {
                l[i]![j] = (1.0 / l[j]![j]!) * (matrix[i]![j]! - sum);
            }
        }
    }
    return l;
}

/**
 * Samples a vector from a Multivariate Normal Distribution.
 * x ~ N(mu, Sigma)
 */
export function sampleMultivariateNormal(mu: number[], sigmaLower: number[][]): number[] {
    const n = mu.length;
    const z = Array.from({ length: n }, () => sampleNormal());
    const x = [...mu];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            x[i] += sigmaLower[i]![j]! * z[j]!;
        }
    }
    return x;
}

