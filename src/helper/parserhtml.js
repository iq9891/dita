export default (params) => {
  const {
    tpl = '',
  } = params;

  const flag = document.createElement('div');
  flag.innerHTML = tpl;
  return flag.children[0];
};
