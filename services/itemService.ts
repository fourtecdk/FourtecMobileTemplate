import BC_API from './bc_api';

export const getBCItems = async () => {
  try {
    const response = await BC_API.get('items');
    return response.data.value;
  } catch (error) {
    console.error('Error fetching BC Items:', error);
    throw error;
  }
};

export const getBCItem = async (id: string) => {
  try {
    const response = await BC_API.get(`items(${id})`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching BC Item ${id}:`, error);
    throw error;
  }
};

export const createBCItem = async (item: Record<string, unknown>) => {
  try {
    const response = await BC_API.post('items', item);
    return response.data;
  } catch (error) {
    console.error('Error creating BC Item:', error);
    throw error;
  }
};

export const updateBCItem = async (id: string, item: Record<string, unknown>, etag: string) => {
  try {
    const response = await BC_API.patch(`items(${id})`, item, {
      headers: { 'If-Match': etag },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating BC Item ${id}:`, error);
    throw error;
  }
};

export const deleteBCItem = async (id: string, etag: string) => {
  try {
    await BC_API.delete(`items(${id})`, {
      headers: { 'If-Match': etag },
    });
  } catch (error) {
    console.error(`Error deleting BC Item ${id}:`, error);
    throw error;
  }
};
