import PropTypes from "prop-types"; // Asegúrate de importar PropTypes
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const ReactQueryProvider = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

ReactQueryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReactQueryProvider;
