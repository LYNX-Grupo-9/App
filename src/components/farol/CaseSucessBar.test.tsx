import React from 'react';
import { render } from '@testing-library/react-native';
import { CaseSuccessBar } from './farol';

describe('CaseSuccessBar', () => {
    test('renderiza sem erros', async () => {
      const { getByText } = await render(<CaseSuccessBar probability={50} />);
      expect(getByText('MÉDIA')).toBeTruthy();
    });
  
    test('exibe label BAIXA para probabilidade menor que 35', async () => {
      const { getByText } = await render(<CaseSuccessBar probability={20} />);
      expect(getByText('BAIXA')).toBeTruthy();
    });
  
    test('exibe label MÉDIA para probabilidade entre 35 e 59', async () => {
      const { getByText } = await render(<CaseSuccessBar probability={55} />);
      expect(getByText('MÉDIA')).toBeTruthy();
    });
  
    test('exibe label ALTA para probabilidade entre 60 e 84', async () => {
      const { getByText } = await render(<CaseSuccessBar probability={78} />);
      expect(getByText('ALTA')).toBeTruthy();
    });
  
    test('exibe label MUITO ALTA para probabilidade acima de 85', async () => {
      const { getByText } = await render(<CaseSuccessBar probability={94} />);
      expect(getByText('MUITO ALTA')).toBeTruthy();
    });
  
    test('exibe a porcentagem correta no hint', async () => {
      const { getByText } = await render(<CaseSuccessBar probability={40} />);
      expect(getByText(/40%/)).toBeTruthy();
    });
  
    test('exibe hint correto para BAIXA', async () => {
      const { getByText } = await render(<CaseSuccessBar probability={10} />);
      expect(getByText(/Evidências insuficientes/)).toBeTruthy();
    });
  
    test('exibe hint correto para ALTA', async () => {
      const { getByText } = await render(<CaseSuccessBar probability={70} />);
      expect(getByText(/Boas chances de êxito/)).toBeTruthy();
    });
  
    test('exibe título de seção', async () => {
      const { getByText } = await render(<CaseSuccessBar probability={50} />);
      expect(getByText(/Probabilidade de sucesso/i)).toBeTruthy();
    });
  
    test('não quebra nos limites exatos das faixas', async () => {
      const { getByText: get35 } = await render(<CaseSuccessBar probability={35} />);
      expect(get35('MÉDIA')).toBeTruthy();
  
      const { getByText: get60 } = await render(<CaseSuccessBar probability={60} />);
      expect(get60('ALTA')).toBeTruthy();
  
      const { getByText: get85 } = await render(<CaseSuccessBar probability={85} />);
      expect(get85('MUITO ALTA')).toBeTruthy();
    });
  });