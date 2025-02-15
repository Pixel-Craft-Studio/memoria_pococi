import { useQuery, useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "../api/api_constants";
import { BaseApiService } from "../api/api_core";

const getEndpointService = (endpoint) => new BaseApiService(endpoint);

export const useGet = (endpoint) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ALL_SOCIAL_MEDIA],
    queryFn: () => getEndpointService(endpoint).getAll(),
  });
};

export const useGetById = (endpoint, id) => {
  return useQuery({
    queryKey: QUERY_KEYS.SOCIAL_MEDIA(id),
    queryFn: () => getEndpointService(endpoint).getById(id),
  });
};

// Usando POST
export const usePost = (endpoint) => {
  return useMutation({
    mutationFn: (data) => getEndpointService(endpoint).post(data),
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
    },
  });
};

// Usando PATCH
export const usePatch = (endpoint) => {
  return useMutation({
    mutationFn: ({ id, data }) => getEndpointService(endpoint).patch(id, data),
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
    },
  });
};

// Usando DELETE
export const useDelete = (endpoint) => {
  return useMutation({
    mutationFn: (id) => getEndpointService(endpoint).delete(id),
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
    },
  });
};
