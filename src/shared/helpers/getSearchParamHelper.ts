export const getSearchParamHelper = (param: string | string[] = '') => {
  return typeof param === 'string' ? param : param[0];
};
