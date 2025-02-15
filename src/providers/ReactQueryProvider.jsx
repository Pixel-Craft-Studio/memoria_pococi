import PropTypes from "prop-types"; // Asegúrate de importar PropTypes
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const ReactQueryProvider = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
};

ReactQueryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReactQueryProvider;
