import BC_API from './bc_api';

export const getBCCustomers = async () => {
  try {
    const response = await BC_API.get('customers');
    return response.data.value;
  } catch (error) {
    console.error('Error fetching BC Customers:', error);
    throw error;
  }
};

export const getBCCustomer = async (id: string) => {
  try {
    const response = await BC_API.get(`customers(${id})`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching BC Customer ${id}:`, error);
    throw error;
  }
};

export const createBCCustomer = async (customer: Record<string, unknown>) => {
  try {
    const response = await BC_API.post('customers', customer);
    return response.data;
  } catch (error) {
    console.error('Error creating BC Customer:', error);
    throw error;
  }
};

export const updateBCCustomer = async (id: string, customer: Record<string, unknown>, etag: string) => {
  try {
    const response = await BC_API.patch(`customers(${id})`, customer, {
      headers: { 'If-Match': etag },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating BC Customer ${id}:`, error);
    throw error;
  }
};

export const deleteBCCustomer = async (id: string, etag: string) => {
  try {
    await BC_API.delete(`customers(${id})`, {
      headers: { 'If-Match': etag },
    });
  } catch (error) {
    console.error(`Error deleting BC Customer ${id}:`, error);
    throw error;
  }
};
