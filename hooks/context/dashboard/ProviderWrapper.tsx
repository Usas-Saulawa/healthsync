import { EHRContextProvider } from "@/hooks/context/dashboard/Context";
import { ContextProps } from "@/types";

export default function ProviderWrapper({ children }: ContextProps) {
  return <EHRContextProvider>{children}</EHRContextProvider>;
}
