// Placeholder for backend API call
export const signPdf = async (file) => {
  // Simulate API call delay and return the same file as a Blob
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Blob([file], { type: "application/pdf" }));
    }, 1500);
  });
}; 