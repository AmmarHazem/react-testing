import { Theme } from "@radix-ui/themes";
import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartProvider } from "../src/providers/CartProvider";

const AllProviders: FC<AllProvidersProps> = ({ children }) => {
  return (
    <Theme>
      <CartProvider>
        <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
          {children}
        </QueryClientProvider>
      </CartProvider>
    </Theme>
  );
};

interface AllProvidersProps {
  children?: ReactNode | undefined;
}

export default AllProviders;
