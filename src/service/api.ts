import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:8081';
const AI_BASE_URL = 'http://localhost:8000'; // Python FastAPI microservice

// ─── Main API instance ────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── AI microservice instance ─────────────────────────────────────────────────

const aiApi = axios.create({
  baseURL: AI_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

aiApi.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Auth ─────────────────────────────────────────────────────────────────────

const authEndpoints = {
  login: (data: { email: string; senha: string }) =>
    api.post('/api/clientes/login', data),

  register: (data: { nome: string; email: string; senha: string; cpf: string }) =>
    api.post('/api/clientes/cadastrar', data),
};

// ─── Casos ────────────────────────────────────────────────────────────────────

const caseEndpoints = {
  getAll: () =>
    api.get('/api/casos'),

  getById: (id: string) =>
    api.get(`/api/casos/${id}`),

  create: (data: {
    areaDireito: string;
    titulo: string;
    descricao: string;
    analiseIa: string;
    idCliente: string;
  }) =>
    api.post('/api/casos', data),

  addInterestedLawyer: (id: string, idAdvogado: string) =>
    api.post(`/api/casos/${id}/advogados-interessado/${idAdvogado}`),

  getInterestedLawyers: (id: string) =>
    api.get(`/api/casos/${id}/advogados-interessados`),
};

// ─── Advogados ────────────────────────────────────────────────────────────────

const lawyerEndpoints = {
  getProfile: (id: string) =>
    api.get(`/api/advogados/${id}/perfil`),
};

// ─── Conversas ────────────────────────────────────────────────────────────────

const chatEndpoints = {
  getAll: (params?: {
    clienteId?: string;
    advogadoId?: string;
    casoId?: string;
  }) =>
    api.get('/api/conversas', { params }),

  getById: (idConversa: string) =>
    api.get(`/api/conversas/${idConversa}`),

  create: (data: { idCliente: string; idAdvogado: string }) =>
    api.post('/api/conversas', data),

  getMessages: (idConversa: string) =>
    api.get(`/api/conversas/${idConversa}/mensagens`),

  sendMessage: (data: { idConversa: string; texto: string }) =>
    api.post('/api/mensagens', data),
};

// ─── IA (Python microservice) ─────────────────────────────────────────────────

const aiEndpoints = {

  analisarCaso: (params: { area: string; descricao: string }) =>
    aiApi.get<{
      analise: string;
      legislacao_consultada: {
        id: number;
        area: string;
        lei: string;
        descricao: string;
      }[];
    }>('/analisar', { params }),

 
  transcreverAudio: (audioFile: {
    uri: string;
    name: string;
    type: string;
  }) => {
    const form = new FormData();
    form.append('audio', audioFile as unknown as Blob);
    return aiApi.post<{ transcricao: string }>('/transcrever', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },


  analisarDocumento: (
    file: { uri: string; name: string; type: string },
    area?: string
  ) => {
    const form = new FormData();
    form.append('arquivo', file as unknown as Blob);
    if (area) form.append('area', area);
    return aiApi.post<{
      sucesso: boolean;
      arquivo: string;
      area_juridica: string;
      texto_extraido: string;
      legislacao_consultada: unknown[];
      analise: string;
      erro?: string;
    }>('/analisar-documento', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  healthDb: () =>
    aiApi.get<{
      status: string;
      banco?: string;
      total_registros?: number;
      erro?: string;
    }>('/health/db'),
};
const endpoints = {
  auth:    authEndpoints,
  cases:   caseEndpoints,
  lawyers: lawyerEndpoints,
  chat:    chatEndpoints,
  ai:      aiEndpoints,
};

export default endpoints;
