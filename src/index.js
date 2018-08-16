// Dita 主类
import Dita from './core/dita';
// Dita 样式
import './core/dita.scss';

if (typeof window !== 'undefined' && !window.Dita) {
  window.Dita = Dita;
}
