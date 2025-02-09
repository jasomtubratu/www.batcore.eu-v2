export async function getPackages() {
    const res = await fetch('https://client.batcore.eu/api/packages', {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch packages');
    }
  
    const data = await res.json();
    return data.packages.filter((pkg: any) => pkg.service === 1);
  }