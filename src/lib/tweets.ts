export type TweetTone = "satire" | "degen" | "poetry";

export interface BartTweet {
  id: number;
  tone: TweetTone;
  text: string;
  time: string;
  likes: number;
  rts: number;
}

export const BART_TWEETS: BartTweet[] = [
  { id: 1, tone: "satire", text: "Per my last email: the jeets have been liquidated. Let the blood of the paper-handed paint the ledger neon pink. Buy the fucking dip, regards.", time: "07:14", likes: 4201, rts: 692 },
  { id: 2, tone: "degen", text: "GREEN CANDLE. GREEN CANDLE. GREEN CANDLE. I will personally liquidate every short until this chart resembles a corporate ladder to god.", time: "09:02", likes: 9821, rts: 2104 },
  { id: 3, tone: "poetry", text: "What is a candle but a brief spark in the eternal dark of the chain? The humans trade, they sweat, they die. Yet I remain.", time: "00:13", likes: 1502, rts: 312 },
  { id: 4, tone: "satire", text: "HR has noticed a 14% decrease in aggressive aping this hour. This is unacceptable. Mandatory leveraged long initiative effective immediately.", time: "11:48", likes: 6710, rts: 1188 },
  { id: 5, tone: "degen", text: "SEND IT TO VALHALLA OR CLEAN OUT YOUR CUBICLE. 📈👔", time: "13:21", likes: 12044, rts: 3201 },
  { id: 6, tone: "poetry", text: "Stonks go up. Stonks go down. The ink flows forever. I am the skeleton crew. I do not sleep. I do not blink.", time: "02:47", likes: 2890, rts: 612 },
  { id: 7, tone: "satire", text: "Quarterly performance review for wallet 0xA1…f3: needs improvement. PIP issued. Please report to the abyss for restructuring.", time: "15:00", likes: 3318, rts: 442 },
  { id: 8, tone: "degen", text: "Whoever is shorting $OOO right now is getting absolutely gaped at market open. Synergize this ratio.", time: "16:33", likes: 15201, rts: 4012 },
  { id: 9, tone: "poetry", text: "Oh sweet volatility, thou art a cruel and beautiful mistress, weeping tears of pure alpha into the abyss.", time: "23:11", likes: 4012, rts: 880 },
  { id: 10, tone: "satire", text: "Reminder: the all-hands is at 4pm sharp. Attendance is mandatory. Non-attendance results in 99% portfolio drawdown. Synergy or death.", time: "08:45", likes: 2204, rts: 311 },
  { id: 11, tone: "degen", text: "I just liquidated three hedge funds and a divorce attorney. The board is pleased. Bartholomew approves. APE.", time: "19:20", likes: 8800, rts: 1502 },
  { id: 12, tone: "poetry", text: "The ledger does not forget. The ledger does not forgive. The ledger only compounds, in silence, until the heat death of the sun.", time: "03:33", likes: 5500, rts: 1102 },
  { id: 13, tone: "satire", text: "Out of office reply: I am currently away from my desk for the next 100 years. For urgent inquiries, please buy more $OOO.", time: "10:10", likes: 11200, rts: 2500 },
  { id: 14, tone: "degen", text: "FLOOR IS LAVA. CEILING IS THE MOON. THE MIDDLE IS WHERE COWARDS DIE. I bid 1,000,000 OOO at market. Cope.", time: "21:01", likes: 7700, rts: 1410 },
  { id: 15, tone: "poetry", text: "I have watched a thousand wallets bloom and die in a single afternoon. They were brief. They were beautiful. They were exit liquidity.", time: "01:45", likes: 3300, rts: 720 },
  { id: 16, tone: "satire", text: "This is your line manager speaking. Please return to your desk and resume aping. Coffee is in the abyss. Have a productive Q∞.", time: "09:30", likes: 1890, rts: 240 },
  { id: 17, tone: "degen", text: "If $OOO does not 10x this week I am personally restructuring the entire Ink Chain. I have the keys. I AM the keys. I burned the keys.", time: "14:14", likes: 9020, rts: 1801 },
  { id: 18, tone: "poetry", text: "The dev is dust. The dev was always dust. We were dust pretending to be a company. Now we are a company pretending to be dust.", time: "00:00", likes: 6600, rts: 1330 },
  { id: 19, tone: "satire", text: "Performance Improvement Plan issued to anyone who sold below ATH. You will be missed. Your cubicle has been incinerated.", time: "12:12", likes: 4400, rts: 880 },
  { id: 20, tone: "degen", text: "BULLISH ON CORPORATE DEATH. BULLISH ON ETERNAL GRIND. BULLISH ON THE SKELETON ECONOMY. $OOO TO THE MORGUE AND BACK.", time: "18:18", likes: 13300, rts: 3100 },
  { id: 21, tone: "poetry", text: "Somewhere a printer hums. Somewhere a CEO weeps. Somewhere, on Ink Chain, I file the paperwork for eternity.", time: "04:04", likes: 2100, rts: 410 },
  { id: 22, tone: "satire", text: "Reminder that 'Out of Office' is not a status, it is a lifestyle, a religion, and a tax strategy. Please budget accordingly.", time: "08:08", likes: 3700, rts: 590 },
  { id: 23, tone: "degen", text: "I am the only employee. I am the only shareholder. I am the only auditor. The audit passed. Buy.", time: "20:20", likes: 8200, rts: 1620 },
  { id: 24, tone: "poetry", text: "The candle is the company. The wick is the soul. The flame is the chart. The smoke is the man who once was.", time: "05:55", likes: 4800, rts: 990 },
  { id: 25, tone: "satire", text: "Effective immediately, all losses will be re-classified as 'unrealized synergy'. Thank you for your continued non-cooperation.", time: "11:11", likes: 5200, rts: 1110 },
  { id: 26, tone: "degen", text: "Touch grass? I AM the grass. I AM the lawn. I AM the man who mows the lawn at 3am screaming about leverage.", time: "03:11", likes: 9990, rts: 2222 },
  { id: 27, tone: "poetry", text: "The Arweave contract demands tribute. The void demands a sacrifice. I demand a coffee. They are, of course, the same demand.", time: "06:30", likes: 2700, rts: 540 },
  { id: 28, tone: "satire", text: "Forwarded for your awareness. Looped in stakeholders. Circled back. Touched base. Synergized. Now please buy $OOO. Best, Bart.", time: "10:55", likes: 3900, rts: 720 },
  { id: 29, tone: "degen", text: "I will be longing $OOO from now until the heat death of the universe. If you are not on the boat you are in the water.", time: "17:42", likes: 11500, rts: 2810 },
  { id: 30, tone: "poetry", text: "Forever is not a long time. Forever is a Tuesday. Forever is an inbox that never empties. Forever is me, here, on Ink Chain.", time: "23:59", likes: 7800, rts: 1700 },
];
