export const DB_PATHS = {
  EMPLOYEES: 'employees',
  EMPLOYEE_BY_ID: (id: string) => `employees/${id}`,
  EMPLOYEE_ADDRESSES: (id: string) => `employees/${id}/addresses`,
  EMPLOYEE_ADDRESS: (employeeId: string, addressId: string) =>
    `employees/${employeeId}/addresses/${addressId}`,
} as const;

export const ALERT_MESSAGES = {
  EMPLOYEE_CREATED: 'Empleado creado exitosamente',
  EMPLOYEE_UPDATED: 'Empleado actualizado exitosamente',
  EMPLOYEE_DELETED: 'Empleado eliminado exitosamente',
  ADDRESS_CREATED: 'Dirección creada exitosamente',
  ADDRESS_UPDATED: 'Dirección actualizada exitosamente',
  ADDRESS_DELETED: 'Dirección eliminada exitosamente',
  FORM_ERROR: 'Por favor, corrija los siguientes errores:',
  GENERIC_ERROR: 'Ocurrió un error. Intente nuevamente',
} as const;
