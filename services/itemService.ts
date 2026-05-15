import BC_API from './bc_api';

export const getBCItems = async () => {
  try {
    // This calls the standard 'items' ODataV4 endpoint
    const response = await BC_API.get('items');
    return response.data.value; 
  } catch (error) {
    console.error('Error fetching BC Items:', error);
    throw error;
  }
};
