// Utility to parse and verify individual umpire PINs from .env

export const OFFICIAL_UMPIRES = [
  { pin: '4829', name: 'TAMIM ONI' },
  { pin: '7163', name: 'VIJAY KHAMMAM' },
  { pin: '9341', name: 'MOHAMMED ZAMAN' },
  { pin: '2587', name: 'ANDY KOILPILLAI' },
  { pin: '6194', name: 'SUSHEEL BHAT' },
  { pin: '3720', name: 'VINEEL DUSSA' },
  { pin: '8452', name: 'ABU JAYED RAHI' },
];

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

  return OFFICIAL_UMPIRES;
}

export function verifyUmpirePin(pinInput) {
  if (!pinInput) return { valid: false, message: 'Please enter your assigned PIN' };
  
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
    message: 'Invalid Umpire PIN. Please check your assigned code.'
  };
}
