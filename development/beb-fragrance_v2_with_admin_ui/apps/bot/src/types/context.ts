/**
 * 🤖 Bot konteksti tipi
 *
 * `telegraf`ning standart `Context` tipini `session: BotSession`
 * maydoni bilan kengaytiradi. Barcha handler, scene va xizmatlarda
 * (`services`) shu tip ishlatiladi:
 *
 * ```ts
 * import { BotContext } from '../types/context';
 *
 * export async function someHandler(ctx: BotContext): Promise<void> {
 *   const lang = ctx.session.language;
 *   // ...
 * }
 * ```
 */

import { Context } from 'telegraf';
import type { BotSession } from './session';

export interface BotContext extends Context {
  /** `config/bot.ts` dagi `session()` middleware'i orqali to'ldiriladi */
  session: BotSession;
}