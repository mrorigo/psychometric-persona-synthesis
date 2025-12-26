# Psychometric Persona Generator

A high-fidelity system for designing and simulating AI agents with realistic psychological profiles. This engine produces descriptive prompts grounded in the **Big Five Inventory (BFI-2)** and incorporates meta-analytic research to generate role-aware personas for professional simulation.

## 📖 Theoretical Foundation

The generator is built upon established psychometric frameworks and contemporary research:

*   **Core Methodology**: Based on the paper *[Designing AI-Agents with Personalities: A Psychometric Approach](https://arxiv.org/abs/2410.19238)* by Muhua Huang, Xijuan Zhang, Christopher Soto, and James Evans.
*   **Technical Specification**: For a deep dive into the mathematical implementation (Cholesky, Box-Muller) and quantitative parameters, see the **[Technical Whitepaper](WHITEPAPER.md)**.
*   **Inventory Tuning**: Utilizes the **BFI-2** (60 items) with complete mapping for domains and facets.
*   **Professional Parameterization**: incorporates meta-analytic data from **SOEP**, **EVS**, and **ESS**.

---

## ✨ Key Features

### 1. Psychometric Realism
The system employs a **Multivariate Normal Distribution** for trait sampling. Instead of treating personality factors as independent scales, it respects population-level inter-trait correlations (e.g., the statistical relationship between Conscientiousness and Extraversion). This ensures that generated personas "hang together" with psychological validity, powered by an internal Cholesky decomposition engine.

### 2. Role-Aware Simulation
Generate personas tailored to specific professional backgrounds with realistic demographic and value priors:
- **Management & Entrepreneurship**: Profiles for **General Manager** and **Entrepreneur** with high Extraversion and Achievement values.
- **Healthcare & Education**: Specialized profiles for **Medical Doctor**, **Nurse**, and **Elementary School Teacher** emphasizing Benevolence and Universalism.
- **Technology & Arts**: High-Openness profiles for **Software Developer** and **Artist**.
- **Public Safety & Skilled Labor**: Profiles for **Police Officer**, **Electrician**, and **Administrative Assistant** with associated values like Security and Tradition.

### 3. Hierarchical Score Generation
To ensure internal consistency across the 60 individual BFI-2 items:
- The system first samples 5 foundational domain scores.
- Item-level scores are derived from these domains with controlled variance.
- Reverse-scored items are automatically synchronized (e.g., a high Extraversion sample correctly yields low scores on "introverted" markers).

### 4. Narrative Synthesis
The **PersonaGenerator** translates numeric vectors into high-quality natural language using:
- **Linguistic Bundling**: Grouping traits by intensity to avoid repetitive markers and enhance narrative flow.
- **Adjectival Standardisation**: Every trait is mapped to a semantically rigorous adjectival form (e.g., "orderly" vs "disorganized") to ensure clarity when combined with qualifiers like "not at all".
- **Perspective Shifting**: Supports **First Person** ("I am..."), **Second Person** ("You are..."), and **Third Person** ("They are...") voices.

---

## 📄 Documentation

- **[Technical Whitepaper](file:///Users/origo/src/psychometric-personas/WHITEPAPER.md)**: Details the mathematical foundations (Multivariate Normal Sampling, Cholesky Decomposition), psychological theory, and full quantitative parameters (Appendix A).
- **Project Briefing**: Background on the system's requirements and research goals.

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0 or higher)

### Installation

```bash
bun install
```

### Usage

Generate a standard random persona:
```bash
bun run src/index.ts --random
```

Generate a role-specific persona with strong trait filtering in the first person:
```bash
bun run src/index.ts --random --role "University Professor" --filter strong --perspective first
```

### CLI Options

| Flag | Name            | Description                                                                       | Default  |
| :--- | :-------------- | :-------------------------------------------------------------------------------- | :------- |
| `-r` | `--random`      | Generate hierarchical scores based on population distributions.                   | -        |
| `-l` | `--role`        | Occupational role (e.g., "Medical Doctor", "Software Developer", "Entrepreneur"). | -        |
| `-f` | `--filter`      | Density level (`none`, `strong`, `extreme`).                                      | `none`   |
| `-p` | `--perspective` | Grammatical voice (`first`, `second`, or `third`).                                | `second` |
| `-s` | `--scores`      | Provide a JSON string of specific BFI-2 item scores.                              | -        |
| `-o` | `--out`         | Path to save the generated prompt text.                                           | -        |

---

## 🛠️ Project Structure

- `src/lib/PersonaGenerator.ts`: Core logic for linguistic transformation and narrative bundling.
- `src/lib/math.ts`: Mathematical primitives for multivariate normal sampling and matrix decomposition.
- `src/data/bfi2_items.ts`: Full 60-item BFI-2 mapping with domain and reverse-scoring metadata.
- `src/data/occupations.ts`: Meta-analytic offsets, education probabilities, and value sets for roles.
- `src/index.ts`: CLI orchestration and scoring logic.

## 📜 References

1. Huang, M., Zhang, X., Soto, C., & Evans, J. (2024). *Designing AI-Agents with Personalities: A Psychometric Approach*. arXiv:2410.19238.
2. Soto, C. J., & John, O. P. (2017). *The next Big Five Inventory (BFI-2): Developing and assessing a hierarchical model with 15 facets to enhance bandwidth, fidelity, and predictive power*. Journal of Personality and Social Psychology. 
3. Barrick, M. R., & Mount, M. K. (1991). *The Big Five personality dimensions and job performance: A meta-analysis*. Personnel Psychology.
4. Digman, J. M. (1997). *Higher-order factors of the Big Five*. Journal of Personality and Social Psychology. (Basis for inter-trait correlation matrices).
5. Schwartz, S. H. (2012). *An Overview of the Schwartz Theory of Basic Values*. Online Readings in Psychology and Culture.
6. *German Socio-Economic Panel (SOEP)* & *European Social Survey (ESS)*.