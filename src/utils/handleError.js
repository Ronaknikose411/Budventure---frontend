export const handleError = (error) => {
  if (error.response) {
    return error.response.data?.message || "Something went wrong";
  }

  if (error.message) return error.message;

  return "Unknown error occurred";
};
