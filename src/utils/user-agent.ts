export function isIOSSafari(): boolean {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  
  return isIOS && isSafari;
}

export function supportsDateInput(): boolean {
  return !isIOSSafari();
}