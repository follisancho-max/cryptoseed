'use server';
/**
 * @fileOverview Analyzes a seed phrase for potential security risks using AI.
 *
 * - analyzeSeedPhraseForRisk - A function that analyzes the seed phrase.
 * - AnalyzeSeedPhraseForRiskInput - The input type for the analyzeSeedPhraseForRisk function.
 * - AnalyzeSeedPhraseForRiskOutput - The return type for the analyzeSeedPhraseForRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSeedPhraseForRiskInputSchema = z.object({
  seedPhrase: z
    .string()
    .describe('The seed phrase to analyze.'),
  network: z.string().describe('The blockchain network associated with the seed phrase.'),
});
export type AnalyzeSeedPhraseForRiskInput = z.infer<
  typeof AnalyzeSeedPhraseForRiskInputSchema
>;

const AnalyzeSeedPhraseForRiskOutputSchema = z.object({
  riskAssessment: z
    .string()
    .describe(
      'A detailed assessment of the potential security risks associated with the seed phrase and network.'
    ),
  compromisedAddresses: z
    .array(z.string())
    .optional()
    .describe('An array of addresses derived from the seed phrase that are known to be compromised.'),
  unusualTransactionPatterns: z
    .string()
    .optional()
    .describe('Description of any unusual transaction patterns detected, if available.'),
});
export type AnalyzeSeedPhraseForRiskOutput = z.infer<
  typeof AnalyzeSeedPhraseForRiskOutputSchema
>;

export async function analyzeSeedPhraseForRisk(
  input: AnalyzeSeedPhraseForRiskInput
): Promise<AnalyzeSeedPhraseForRiskOutput> {
  return analyzeSeedPhraseForRiskFlow(input);
}

const analyzeSeedPhraseForRiskPrompt = ai.definePrompt({
  name: 'analyzeSeedPhraseForRiskPrompt',
  input: {schema: AnalyzeSeedPhraseForRiskInputSchema},
  output: {schema: AnalyzeSeedPhraseForRiskOutputSchema},
  prompt: `You are an AI-powered security analyst specializing in blockchain security.

You will analyze the provided seed phrase for potential security risks, including known compromised addresses and unusual transaction patterns on the specified network.

Seed Phrase: {{{seedPhrase}}}
Network: {{{network}}}

Provide a detailed risk assessment, including any compromised addresses derived from the seed phrase and any unusual transaction patterns detected.

Ensure the risk assessment is comprehensive and easy to understand for a security-conscious user.
`,
});

const analyzeSeedPhraseForRiskFlow = ai.defineFlow(
  {
    name: 'analyzeSeedPhraseForRiskFlow',
    inputSchema: AnalyzeSeedPhraseForRiskInputSchema,
    outputSchema: AnalyzeSeedPhraseForRiskOutputSchema,
  },
  async input => {
    const {output} = await analyzeSeedPhraseForRiskPrompt(input);
    return output!;
  }
);

