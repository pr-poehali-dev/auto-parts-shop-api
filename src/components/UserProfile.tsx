import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface UserProfileProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '' });

  const orders = [
    { id: '#12345', date: '2024-01-15', total: '15 400 ₽', status: 'Доставлен', items: 3 },
    { id: '#12346', date: '2024-01-20', total: '8 200 ₽', status: 'В пути', items: 2 },
    { id: '#12347', date: '2024-01-25', total: '3 500 ₽', status: 'Обработка', items: 1 },
  ];

  const vehicles = [
    { id: 1, brand: 'BMW', model: '3 Series', year: 2018, vin: 'WBAVD13526KX12345' },
    { id: 2, brand: 'Mercedes-Benz', model: 'C-Class', year: 2020, vin: 'WDDGF4HB0LA123456' },
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Вход в личный кабинет</CardTitle>
            <CardDescription>
              Войдите в аккаунт для отслеживания заказов и управления автомобилями
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  />
                </div>
                <Button onClick={handleLogin} className="w-full">
                  <Icon name="LogIn" className="w-4 h-4 mr-2" />
                  Войти
                </Button>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    placeholder="Иван Петров"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your@email.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Пароль</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  />
                </div>
                <Button onClick={handleRegister} className="w-full">
                  <Icon name="UserPlus" className="w-4 h-4 mr-2" />
                  Создать аккаунт
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>ИП</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Иван Петров</CardTitle>
              <CardDescription>ivan.petrov@example.com</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Заказы</TabsTrigger>
          <TabsTrigger value="vehicles">Автомобили</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>История заказов</CardTitle>
              <CardDescription>Отслеживайте статус ваших заказов</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{order.id}</h4>
                      <p className="text-sm text-gray-600">{order.date}</p>
                      <p className="text-sm text-gray-600">{order.items} товаров</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{order.total}</p>
                      <Badge variant={
                        order.status === 'Доставлен' ? 'default' :
                        order.status === 'В пути' ? 'secondary' : 'outline'
                      }>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vehicles" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Мои автомобили</CardTitle>
                  <CardDescription>Управляйте информацией о ваших автомобилях</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="Plus" className="w-4 h-4 mr-2" />
                      Добавить авто
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Добавить автомобиль</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="vin">VIN-код</Label>
                        <Input id="vin" placeholder="17 символов" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="brand">Марка</Label>
                        <Input id="brand" placeholder="BMW" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="model">Модель</Label>
                        <Input id="model" placeholder="3 Series" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Год</Label>
                        <Input id="year" placeholder="2018" />
                      </div>
                      <Button className="w-full">
                        <Icon name="Plus" className="w-4 h-4 mr-2" />
                        Добавить
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{vehicle.brand} {vehicle.model}</h4>
                      <p className="text-sm text-gray-600">Год: {vehicle.year}</p>
                      <p className="text-xs text-gray-500 font-mono">VIN: {vehicle.vin}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Icon name="Search" className="w-4 h-4 mr-1" />
                        Найти запчасти
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Edit" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки аккаунта</CardTitle>
              <CardDescription>Управляйте настройками профиля</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Имя</Label>
                <Input id="profile-name" defaultValue="Иван Петров" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input id="profile-email" defaultValue="ivan.petrov@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-phone">Телефон</Label>
                <Input id="profile-phone" placeholder="+7 (999) 123-45-67" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-address">Адрес доставки</Label>
                <Input id="profile-address" placeholder="Москва, ул. Примерная, д. 1" />
              </div>
              <Button className="w-full">
                <Icon name="Save" className="w-4 h-4 mr-2" />
                Сохранить изменения
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;