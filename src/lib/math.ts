/**
 * Mulberry32 PRNG for deterministic random number generation.
 */
export function mulberry32(seed: number): () => number {
    return function () {
        seed |= 0; seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}

/**
 * Samples from a Standard Normal Distribution N(0, 1) 
 * using the Box-Muller transform.
 */
export function sampleNormal(random: () => number = Math.random): number {
    let u = 0, v = 0;
    while (u === 0) u = random();
    while (v === 0) v = random();
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
export function sampleMultivariateNormal(mu: number[], sigmaLower: number[][], random: () => number = Math.random): number[] {
    const n = mu.length;
    const z = Array.from({ length: n }, () => sampleNormal(random));
    const x = [...mu];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            x[i] = x[i]! + sigmaLower[i]![j]! * z[j]!;
        }
    }
    return x;
}

