import { Theme } from "@radix-ui/themes";
import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartProvider } from "../src/providers/CartProvider";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "../src/providers/ReduxProvider";

const AllProviders: FC<AllProvidersProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <Theme>
        <Toaster />
        <CartProvider>
          <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
            {children}
          </QueryClientProvider>
        </CartProvider>
      </Theme>
    </ReduxProvider>
  );
};

interface AllProvidersProps {
  children?: ReactNode | undefined;
}

export default AllProviders;
