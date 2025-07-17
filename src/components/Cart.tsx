import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  category: string;
  quantity: number;
  image?: string;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const totalPrice = items.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <Icon name="ShoppingCart" className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Корзина пуста</h3>
        <p className="text-gray-500">Добавьте товары в корзину для оформления заказа</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Корзина ({totalItems})</h3>
        <Button variant="outline" size="sm" onClick={onClearCart}>
          <Icon name="Trash2" className="w-4 h-4 mr-1" />
          Очистить
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-lg font-bold text-blue-600">{item.price}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  disabled={item.quantity <= 1}
                >
                  <Icon name="Minus" className="w-3 h-3" />
                </Button>
                
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Icon name="Plus" className="w-3 h-3" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Icon name="X" className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Товаров:</span>
          <span className="font-medium">{totalItems} шт.</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Доставка:</span>
          <span className="font-medium">Бесплатно</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Итого:</span>
          <span className="text-blue-600">{totalPrice.toLocaleString()} ₽</span>
        </div>
      </div>

      <div className="space-y-2">
        <Button className="w-full" size="lg">
          <Icon name="CreditCard" className="w-4 h-4 mr-2" />
          Оформить заказ
        </Button>
        
        <div className="flex space-x-2">
          <Button variant="outline" className="flex-1">
            <Icon name="Phone" className="w-4 h-4 mr-2" />
            Заказать звонок
          </Button>
          <Button variant="outline" className="flex-1">
            <Icon name="MessageCircle" className="w-4 h-4 mr-2" />
            Чат с менеджером
          </Button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Преимущества заказа:</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li className="flex items-center">
            <Icon name="Check" className="w-3 h-3 mr-2 text-green-600" />
            Бесплатная доставка от 3000 ₽
          </li>
          <li className="flex items-center">
            <Icon name="Check" className="w-3 h-3 mr-2 text-green-600" />
            Гарантия на все запчасти
          </li>
          <li className="flex items-center">
            <Icon name="Check" className="w-3 h-3 mr-2 text-green-600" />
            Возврат в течение 14 дней
          </li>
          <li className="flex items-center">
            <Icon name="Check" className="w-3 h-3 mr-2 text-green-600" />
            Оплата при получении
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cart;