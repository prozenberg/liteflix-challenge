const uploadMovie = async (file, title) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);

  const response = await fetch('http://localhost:3000/movies', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload movie');
  }

  return response.json();
};

export default uploadMovie;
