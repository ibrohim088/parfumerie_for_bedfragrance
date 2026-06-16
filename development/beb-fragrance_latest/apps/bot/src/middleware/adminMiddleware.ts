import { BotContext } from '../types/context';

export async function adminMiddleware(ctx: BotContext, next: () => Promise<void>): Promise<void> {
  if (!ctx.session.isAdmin) {
    await ctx.reply('⛔ Ruxsat yo\'q.');
    return;
  }
  return next();
}