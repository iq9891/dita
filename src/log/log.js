import parserHtml from '../helper/parserhtml';
import logHtml from './log.html';
import $ from '../helper/dom';

export default class Print {
  constructor() {
    this.getElement();
    this.render();
  }

  getElement() {
    this.$log = $('#__dita-log');
  }

  render() {
    const tpls = logHtml.split('\n');
    const $error = $(parserHtml({
      tpl: tpls[1],
    }));
    $error.html('testtttt');
    console.log(tpls, this.$log, $error);
    this.$log.append($error);
  }
}
