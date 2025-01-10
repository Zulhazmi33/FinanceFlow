import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private icons = [
    { name: 'account_balance', tags: ['bank', 'balance', 'finance'] },
    { name: 'account_balance_wallet', tags: ['wallet', 'bank', 'money', 'finance'] },
    { name: 'apartment', tags: ['apartment', 'rent', 'housing', 'home'] },
    { name: 'apparel', tags: ['apparel', 'shirt', 'clothes'] },
    { name: 'attach_file', tags: ['file', 'attachment', 'document', 'bill'] },
    { name: 'attach_money', tags: ['money', 'currency', 'payment', 'dollar'] },
    { name: 'balance_wallet', tags: ['balance', 'wallet', 'funds'] },
    { name: 'bolt', tags: ['electric', 'bill'] },
    { name: 'book', tags: ['bookkeeping', 'finance', 'record', 'accounting'] },
    { name: 'build_circle', tags: ['build', 'construction', 'house', 'maintenance'] },
    { name: 'card_travel', tags: ['travel', 'card', 'finance', 'spending'] },
    { name: 'cash_flow', tags: ['cash', 'flow', 'income', 'expense'] },
    { name: 'charity', tags: ['donate', 'charity', 'help', 'giving'] },
    { name: 'coupon', tags: ['discount', 'coupon', 'deal', 'offer'] },
    { name: 'credit_card', tags: ['credit', 'card', 'payment'] },
    { name: 'credit_card_payment', tags: ['credit', 'card', 'payment', 'transaction'] },
    { name: 'credit_score', tags: ['credit', 'score', 'rating', 'finance'] },
    { name: 'credit_card_off', tags: ['card', 'payment', 'credit', 'disable'] },
    { name: 'debt', tags: ['debt', 'finance', 'loan', 'owe'] },
    { name: 'digital_wallet', tags: ['digital', 'wallet', 'payment'] },
    { name: 'directions_car', tags: ['car', 'loan', 'purchase', 'finance'] },
    { name: 'dollar', tags: ['dollar', 'currency', 'money', 'finance'] },
    { name: 'electric_bike', tags: ['transportation', 'bike', 'electric', 'vehicle'] },
    { name: 'education_fund', tags: ['tuition', 'education', 'fund', 'saving'] },
    { name: 'expense_report', tags: ['expense', 'report', 'finance', 'track'] },
    { name: 'expenses', tags: ['expenses', 'cost', 'finance', 'spending'] },
    { name: 'fitness_center', tags: ['gym', 'workout', 'exercise'] },
    { name: 'flight_takeoff', tags: ['flight', 'trip', 'travel', 'expense'] },
    { name: 'financial_growth', tags: ['investment', 'growth', 'finance'] },
    { name: 'gift', tags: ['gift', 'spending', 'purchase', 'present'] },
    { name: 'gift_card', tags: ['gift', 'card', 'purchase'] },
    { name: 'gym', tags: ['fitness', 'membership', 'expense', 'health'] },
    { name: 'history', tags: ['history', 'record', 'transaction', 'finance'] },
    { name: 'home_loan', tags: ['home', 'loan', 'purchase', 'finance'] },
    { name: 'home_repair_service', tags: ['home', 'maintenance', 'repair', 'expense'] },
    { name: 'hotel', tags: ['hotel', 'accommodation', 'stay', 'travel'] },
    { name: 'insurance', tags: ['insurance', 'policy', 'protection', 'finance'] },
    { name: 'insurance_claim', tags: ['insurance', 'claim', 'protection'] },
    { name: 'investment', tags: ['investment', 'stock', 'funds'] },
    { name: 'laundry', tags: ['clothing', 'fashion', 'shirt', 'wear'] },
    { name: 'local_atm', tags: ['atm', 'bank', 'withdrawal', 'cash'] },
    { name: 'local_gas_station', tags: ['fuel', 'gas', 'petrol', 'oil', 'energy'] },
    { name: 'local_hospital', tags: ['health', 'medical', 'doctor', 'care'] },
    { name: 'local_offer', tags: ['sale', 'deal', 'offer', 'discount'] },
    { name: 'local_parking', tags: ['parking', 'fee', 'vehicle'] },
    { name: 'money', tags: ['currency', 'cash', 'funds', 'wallet'] },
    { name: 'money_off', tags: ['money', 'currency', 'off', 'spending'] },
    { name: 'motorcycle', tags: ['transportation', 'bike', 'vehicle', 'expense'] },
    { name: 'new_releases', tags: ['subscriptions', 'services', 'monthly'] },
    { name: 'nightlife', tags: ['fancy', 'rich', 'expensive'] },
    { name: 'payment', tags: ['payment', 'transaction', 'pay'] },
    { name: 'payment_savings', tags: ['payment', 'saving', 'funds'] },
    { name: 'payday', tags: ['pay', 'day', 'salary', 'income'] },
    { name: 'pension', tags: ['pension', 'retirement', 'saving'] },
    { name: 'purchase', tags: ['purchase', 'buy', 'spending'] },
    { name: 'refund', tags: ['refund', 'money', 'return'] },
    { name: 'recharge', tags: ['recharge', 'phone', 'data', 'payment'] },
    { name: 'revenue', tags: ['revenue', 'income', 'finance'] },
    { name: 'school', tags: ['education', 'tuition', 'fees', 'learning'] },
    { name: 'shopping_basket', tags: ['basket', 'cart', 'purchase'] },
    { name: 'shopping_cart', tags: ['shopping', 'retail', 'mall', 'clothes', 'groceries'] },
    { name: 'shopping_spree', tags: ['shopping', 'spending', 'retail', 'expenses'] },
    { name: 'shopping_cart_checkout', tags: ['checkout', 'purchase', 'cart', 'pay'] },
    { name: 'smart_toy', tags: ['play', 'kids', 'fun', 'game', 'toy'] },
    { name: 'star', tags: ['favorite', 'rate', 'rating', 'star'] },
    { name: 'store', tags: ['store', 'shopping', 'purchase'] },
    { name: 'subscriptions', tags: ['subscription', 'service', 'payment', 'fees'] },
    { name: 'swap_horiz', tags: ['exchange', 'currency', 'swap', 'finance'] },
    { name: 'tax', tags: ['tax', 'payment', 'finance'] },
    { name: 'taxi_alert', tags: ['taxi', 'transportation', 'expense'] },
    { name: 'toll', tags: ['toll', 'tax', 'payment'] },
    { name: 'transfer_within_a_station', tags: ['transfer', 'payment', 'transaction'] },
    { name: 'trending_down', tags: ['loss', 'finance', 'decline', 'drop'] },
    { name: 'trending_up', tags: ['investing', 'finance', 'growth', 'stock'] },
    { name: 'wallet', tags: ['wallet', 'finance', 'money', 'cash'] },
    { name: 'wallet_travel', tags: ['wallet', 'travel', 'expense', 'spending'] },
    { name: 'water_drop', tags: ['water', 'bill'] },
    { name: 'volunteer_activism', tags: ['donation', 'charity', 'giving'] }
  ];



  // Method to get all icons
  getIcons() {
    return this.icons;
  }

  // Method to filter icons based on a search term
  filterIcons(searchTerm: string) {
    if (searchTerm.trim()) {
      return this.icons.filter((icon) =>
        icon.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      return [];
    }
  }
}
