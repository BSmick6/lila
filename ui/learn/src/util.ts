import type { Square as Key } from 'chess.js';
import { Level, LevelPartial } from './stage/list';
import { h } from 'snabbdom';
import * as cg from 'chessground/types';
import { DrawShape } from 'chessground/draw';

export type WithGround = <A>(f: (cg: CgApi) => A) => A | false | undefined;

export function toLevel(l: LevelPartial, it: number): Level {
  if (l.fen.split(' ').length === 4) l.fen += ' 0 1';

  return {
    id: it + 1,
    apples: [],
    color: / w /.test(l.fen) ? 'white' : 'black',
    detectCapture: l.apples ? false : 'unprotected',
    ...l,
  };
}

export const assetUrl = document.body.dataset.assetUrl + '/assets/';

export const roleToSan: {
  [R in PromotionRole]: PromotionChar;
} = {
  knight: 'n',
  bishop: 'b',
  rook: 'r',
  queen: 'q',
};
export type PromotionRole = 'knight' | 'bishop' | 'rook' | 'queen';
export type PromotionChar = 'n' | 'b' | 'r' | 'q';

export function isRole(str: PromotionChar | PromotionRole): str is PromotionRole {
  return str.length > 1;
}

export function arrow(vector: Uci, brush?: cg.BrushColor): DrawShape {
  return {
    brush: brush || 'paleGreen',
    orig: vector.slice(0, 2) as Key,
    dest: vector.slice(2, 4) as Key,
  };
}

export function circle(key: Key, brush?: cg.BrushColor): DrawShape {
  return {
    brush: brush || 'green',
    orig: key,
  };
}

export function readKeys(keys: string | Key[]) {
  return typeof keys === 'string' ? (keys.split(' ') as Key[]) : keys;
}

export function setFenTurn(fen: string, turn: 'b' | 'w') {
  return fen.replace(/ (w|b) /, ' ' + turn + ' ');
}

export function pieceImg(role: string) {
  return h('div.no-square', h('piece.white.' + role));
}

export function roundSvg(url: string) {
  return h('div.round-svg', h('img', { attrs: { src: url } }));
}

export function withLinebreaks(text: string) {
  return text.split(/(\n)/g).map(part => (part === '\n' ? h('br') : part));
}

export function decomposeUci(uci: string) {
  return [uci.slice(0, 2), uci.slice(2, 4), uci.slice(4, 5)] as [Key, Key, PromotionChar | ''];
}
