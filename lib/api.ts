export async function getPackages(type: number) {
    const res = await fetch('https://client.batcore.eu/api/packages', {
      next: { revalidate: 600 } // 10 minut cache
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch packages');
    }
  
    const data = await res.json();
    return data.packages.filter((pkg: any) => pkg.service === type);
  }