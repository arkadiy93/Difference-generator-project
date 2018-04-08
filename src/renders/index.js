import deepRender from './deepRender';
import flatRender from './flatRender';
import plainRender from './plainRender';

const chooseRender = {
  plain: plainRender,
  tree: deepRender,
};

export {
  deepRender,
  flatRender,
  plainRender,
  chooseRender,
};
