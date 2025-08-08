import { Theme } from "@radix-ui/themes";
import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const AllProviders: FC<AllProvidersProps> = ({ children }) => {
  return (
    <Theme>
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        {children}
      </QueryClientProvider>
    </Theme>
  );
};

interface AllProvidersProps {
  children?: ReactNode | undefined;
}

export default AllProviders;
