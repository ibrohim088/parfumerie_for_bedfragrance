import { BotContext } from '../types/context';

export async function authMiddleware(ctx: BotContext, next: () => Promise<void>): Promise<void> {
  if (!ctx.session.token) {
    const lang = ctx.session.language ?? 'uz';
    await ctx.reply(lang === 'uz' ? '🔐 Iltimos, avval tizimga kiring.' : '🔐 Пожалуйста, войдите в систему.');
    return;
  }
  return next();
}