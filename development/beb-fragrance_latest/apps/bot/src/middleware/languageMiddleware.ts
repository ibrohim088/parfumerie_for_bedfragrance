import { BotContext } from '../types/context';

export async function languageMiddleware(ctx: BotContext, next: () => Promise<void>): Promise<void> {
  if (!ctx.session.language) {
    ctx.session.language = 'uz';
  }
  return next();
}