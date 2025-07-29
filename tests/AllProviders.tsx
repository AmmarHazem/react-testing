import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const AllProviders: FC<AllProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      {children}
    </QueryClientProvider>
  );
};

interface AllProvidersProps {
  children?: ReactNode | undefined;
}

export default AllProviders;
