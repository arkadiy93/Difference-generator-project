import deepRender from './deepRender';
import plainRender from './plainRender';
import jsonRender from './jsonRender';

const chooseRender = {
  plain: plainRender,
  tree: deepRender,
  json: jsonRender,
};

export default renderType => (data) => {
  const render = chooseRender[renderType];
  if (!render) {
    throw new Error(`unkown render: ${render}`);
  }
  return render(data);
};
