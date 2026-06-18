export const getErrorMessage = (error) => {
  const data = error?.response?.data;

  if (!data) {
    return "Something went wrong. Please try again.";
  }

  if (data.errors?.length) {
    return data.errors.map((err) => err.msg || err.message).join(", ");
  }

  return data.message || "Something went wrong. Please try again.";
};
