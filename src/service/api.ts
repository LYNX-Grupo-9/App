import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:8081';

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

const authEndpoints = {
  login: (data: { email: string; senha: string }) =>
    api.post('/api/clientes/login', data),

  register: (data: { nome: string; email: string; senha: string, cpf: string }) =>
    api.post('/api/clientes/cadastrar', data),
};

// ─── Casos ────────────────────────────────────────────────────────────────────

const caseEndpoints = {
  getAll: () =>
    api.get('/api/casos'),

  getById: (id: string) =>
    api.get(`/api/casos/${id}`),

  create: (data: {
    idCliente: string;
    idAdvogado: string;
    idCaso: string;
  }) =>
    api.post('/api/conversas', data),
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

const endpoints = {
  auth:    authEndpoints,
  cases:   caseEndpoints,
  lawyers: lawyerEndpoints,
  chat:    chatEndpoints,
};

export default endpoints;