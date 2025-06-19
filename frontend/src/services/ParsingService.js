import api from "../utils/Api";

export async function getAllData(grammar, input, analysisType) {
  return await api.get(`/analyze/${analysisType}/${grammar}/${input}`);
}
