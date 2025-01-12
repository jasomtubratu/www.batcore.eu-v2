import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function usePackages() {
  const { data, error, isLoading } = useSWR(
    "https://client.batcore.eu/api/packages",
    fetcher
  );

  const minecraftPackages = data?.packages?.filter(
    (pkg: any) => pkg.service === 1
  ) || [];

  return {
    packages: minecraftPackages,
    isLoading,
    error
  };
}