// Utility to parse and verify individual umpire PINs from .env

export function getAuthorizedUmpires() {
  const envString = import.meta.env.VITE_AUTHORIZED_UMPIRES;
  
  if (envString) {
    try {
      return envString.split(',').map(entry => {
        const [pin, name] = entry.split(':').map(s => s?.trim());
        return { pin, name: name || `Umpire ${pin}` };
      }).filter(u => u.pin && u.name);
    } catch (e) {
      console.warn('Error parsing VITE_AUTHORIZED_UMPIRES:', e);
    }
  }

  // Default fallback PINs (1001 to 1010)
  return [
    { pin: '1001', name: 'Umpire 1' },
    { pin: '1002', name: 'Umpire 2' },
    { pin: '1003', name: 'Umpire 3' },
    { pin: '1004', name: 'Umpire 4' },
    { pin: '1005', name: 'Umpire 5' },
    { pin: '1006', name: 'Umpire 6' },
    { pin: '1007', name: 'Umpire 7' },
    { pin: '1008', name: 'Umpire 8' },
    { pin: '1009', name: 'Umpire 9' },
    { pin: '1010', name: 'Umpire 10' },
  ];
}

export function verifyUmpirePin(pinInput) {
  if (!pinInput) return { valid: false, message: 'Please enter your 4-digit PIN' };
  
  const cleanPin = pinInput.trim();
  const list = getAuthorizedUmpires();
  const match = list.find(u => u.pin === cleanPin);

  if (match) {
    return {
      valid: true,
      umpire: match,
      message: `Verified Official: ${match.name}`
    };
  }

  return {
    valid: false,
    message: 'Invalid Umpire PIN. Please check your assigned tournament code.'
  };
}
