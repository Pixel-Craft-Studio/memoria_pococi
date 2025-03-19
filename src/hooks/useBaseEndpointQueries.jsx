import { useQuery, useMutation } from "@tanstack/react-query";
import { get_query_key } from "../api/api_constants";
import { BaseApiService } from "../api/api_core";

const getEndpointService = (endpoint) => new BaseApiService(endpoint);

export const useGetAll = (endpoint) => {
  return useQuery({
    queryKey: [get_query_key(endpoint).all_items],
    queryFn: () => getEndpointService(endpoint).getAll(),
  });
};

export const useGetById = (endpoint, id) => {
  return useQuery({
    queryKey: get_query_key(endpoint).single_item(id),
    queryFn: () => getEndpointService(endpoint).getById(id),
  });
};

// Usando POST
export const usePost = (endpoint) => {

  return useMutation({
    mutationFn: (data) => getEndpointService(endpoint).post(data),
    onSuccess: () => {
    },
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
