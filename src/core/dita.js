import coreHtml from './core.html';
import parserHtml from '../helper/parserhtml';
import $ from '../helper/dom';
import Print from '../log/log';

class Dita {
  static isInited
  static tabIndex
  static console

  constructor() {
    this.isInited = false;
    this.tabIndex = 0;
    this.console = {};
    this.ready();
  }

  ready() {
    if (document !== undefined) {
      if (document.readyState === 'complete') {
        this.onload();
      } else {
        window.addEventListener('load', this.onload.bind(this), false);
      }
    } else {
      // if document does not exist, wait for it
      let loadTimer;
      const pollingDocument = () => {
        if (!!document && document.readyState === 'complete') {
          if (loadTimer) {
            clearTimeout(loadTimer);
          }
          this.onload();
        } else {
          loadTimer = setTimeout(pollingDocument, 1);
        }
      };
      loadTimer = setTimeout(pollingDocument, 1);
    }
  }

  onload() {
    if (this.isInited) {
      return;
    }
    this.isInited = true;

    console.log('dita init');
    this.render();
    this.bind();
    this.dpr();
    this.log = new Print();
    // this.mockConsole();
  }
  // 设置兼容性
  dpr() {
    const dpr = window.devicePixelRatio || 1;
    const viewportEl = document.querySelector('[name="viewport"]');
    console.log(window.devicePixelRatio, dpr, 'viewportEl');
    if (viewportEl && viewportEl.content) {
      const initialScale = viewportEl.content.match(/initial-scale=\d+(\.\d+)?/);
      const scale = initialScale ? parseFloat(initialScale[0].split('=')[1]) : 1;
      console.log(scale, 'scale');
      if (scale < 1) {
        // this.$dom.style.fontSize = 13 * dpr + 'px';
        console.log(13 * dpr, '13 * dpr');
      }
    }
  }
  // 渲染
  render() {
    document.documentElement.appendChild(parserHtml({
      tpl: coreHtml,
    }));

    this.$switch = $('#__dita-switch');
    this.$mask = $('#__dita-mask');
    this.$hide = $('#__dita-hide');
    this.$panel = $('#__dita-panel');
    this.$tab = $('.dita-tab');
    this.$contentItem = $('.dita-content-item');
  }
  // 绑定数据
  bind() {
    console.log('bind', this.$switch);
    this.switchEvent();
  }
  // 开关展示
  switchEvent() {
    console.log('111 bind', this.$switch);
    this.$switch.on('touchend', this.showPanel.bind(this));
    // 隐藏
    this.$hide.on('touchend', this.hidePanel.bind(this));
    this.$mask.on('touchend', this.hidePanel.bind(this));
    // 日志类型切换
    this.$tab.on('touchend', this.tabPanel.bind(this));
  }
  // 显示调试面板
  showPanel() {
    this.$mask.show();
    this.$panel.show();
  }
  // 隐藏调试面板
  hidePanel() {
    this.$mask.hide();
    this.$panel.hide();
  }
  // 日志类型切换
  tabPanel(ev) {
    const now = $(ev.target).index();
    this.$tab.eq(now).addClass('dita-on');
    this.$contentItem.eq(now).show();
    this.$tab.eq(this.tabIndex).removeClass('dita-on');
    this.$contentItem.eq(this.tabIndex).hide();
    this.tabIndex = now;
    console.log($(ev.target).index(), $(this).index());
  }
  // 模拟日志
  mockConsole() {
    const methodList = ['log', 'info', 'warn', 'debug', 'error', 'clear', 'time', 'timeEnd'];
    if (!window.console) {
      window.console = {};
    } else {
      methodList.map((method) => {
        this.console[method] = window.console[method];
        return method;
      });
    }
    console.log(this.console, 'this.console');

    // methodList.forEach((method) => {
    //   console.log(method, 111);
    //   window.console[method] = (...args) => {
    //     console.log(args, method, 999);
    //   };
    // });
    window.console.log = (...args) => {
      this.console.log(args, 999);
    };
  }

  printLog() {

  }
}

export default Dita;
