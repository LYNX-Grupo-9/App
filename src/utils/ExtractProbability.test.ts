import { extractProbability } from './parseIaAnalysis';

describe('extractProbability', () => {
  test('extrai porcentagem no formato padrão', () => {
    const analise = '**1. Probabilidade de Êxito (Prognóstico):** 40%';
    expect(extractProbability(analise)).toBe(40);
  });

  test('extrai porcentagem com acento "exito"', () => {
    const analise = '**1. Probabilidade de Exito (Prognóstico):** 75%';
    expect(extractProbability(analise)).toBe(75);
  });

  test('extrai porcentagem sem asteriscos', () => {
    const analise = '1. Probabilidade de Êxito (Prognóstico): 60%';
    expect(extractProbability(analise)).toBe(60);
  });

  test('usa fallback quando formato principal não encontrado', () => {
    const analise = 'A chance de sucesso é de 55% neste caso.';
    expect(extractProbability(analise)).toBe(55);
  });

  test('retorna null quando não há porcentagem', () => {
    const analise = 'Análise sem nenhuma probabilidade mencionada.';
    expect(extractProbability(analise)).toBeNull();
  });

  test('retorna null para string vazia', () => {
    expect(extractProbability('')).toBeNull();
  });

  test('retorna null para undefined', () => {
    expect(extractProbability(undefined)).toBeNull();
  });

  test('extrai corretamente 20% do log real', () => {
    const analise = `**Análise do Caso**\n\n**1. Probabilidade de Êxito (Prognóstico):** 20%\n\nA probabilidade de êxito é baixa...`;
    expect(extractProbability(analise)).toBe(20);
  });

  test('extrai corretamente quando probabilidade é MÉDIA em texto', () => {
    const analise = `**1. Probabilidade de Êxito (Prognóstico)**\n- A probabilidade pode ser classificada como **MÉDIA**. 50%`;
    expect(extractProbability(analise)).toBe(50);
  });
});
