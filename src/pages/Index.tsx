import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import VinScanner from '@/components/VinScanner';
import UserProfile from '@/components/UserProfile';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [vinCode, setVinCode] = useState('');
  const [showVinScanner, setShowVinScanner] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [cartItems, setCartItems] = useState(0);

  const carBrands = [
    { name: 'BMW', logo: '🚗', partsCount: 15420 },
    { name: 'Mercedes-Benz', logo: '⭐', partsCount: 18350 },
    { name: 'Audi', logo: '🔷', partsCount: 12800 },
    { name: 'Volkswagen', logo: '🚙', partsCount: 22100 },
    { name: 'Toyota', logo: '🚘', partsCount: 25600 },
    { name: 'Honda', logo: '🏁', partsCount: 19800 },
    { name: 'Ford', logo: '🚐', partsCount: 17500 },
    { name: 'Chevrolet', logo: '⚡', partsCount: 14200 }
  ];

  const popularParts = [
    { name: 'Тормозные колодки', price: '2 500 ₽', category: 'Тормозная система', inStock: true },
    { name: 'Масляный фильтр', price: '850 ₽', category: 'Двигатель', inStock: true },
    { name: 'Воздушный фильтр', price: '1 200 ₽', category: 'Двигатель', inStock: false },
    { name: 'Свечи зажигания', price: '450 ₽', category: 'Зажигание', inStock: true },
    { name: 'Амортизаторы', price: '4 800 ₽', category: 'Подвеска', inStock: true },
    { name: 'Ремень ГРМ', price: '1 800 ₽', category: 'Двигатель', inStock: true }
  ];

  const apiProviders = [
    { name: 'AutoDoc', status: 'active', partsCount: 250000 },
    { name: 'Exist.ru', status: 'active', partsCount: 180000 },
    { name: 'Emex', status: 'active', partsCount: 320000 },
    { name: 'Berg', status: 'maintenance', partsCount: 150000 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Icon name="Wrench" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MultiBrend</h1>
                <p className="text-xs text-gray-500">Автозапчасти</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Каталог</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Доставка</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Контакты</a>
            </nav>

            <div className="flex items-center space-x-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Icon name="User" className="w-4 h-4 mr-2" />
                    Войти
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Личный кабинет</SheetTitle>
                    <SheetDescription>Управление аккаунтом и заказами</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <UserProfile />
                  </div>
                </SheetContent>
              </Sheet>
              <Button variant="outline" size="sm" onClick={() => toast({ title: "Корзина", description: `У вас ${cartItems} товаров в корзине` })}>
                <Icon name="ShoppingCart" className="w-4 h-4 mr-2" />
                Корзина {cartItems > 0 && `(${cartItems})`}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-orange-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Оригинальные автозапчасти для вашего авто
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Более 500 000 запчастей от надежных поставщиков. Быстрая доставка по всей России.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge variant="secondary" className="px-4 py-2">
                  <Icon name="Shield" className="w-4 h-4 mr-2" />
                  Гарантия качества
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <Icon name="Truck" className="w-4 h-4 mr-2" />
                  Быстрая доставка
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <Icon name="Clock" className="w-4 h-4 mr-2" />
                  24/7 поддержка
                </Badge>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/img/02105a6d-6802-4408-a3b6-d9b6134596a4.jpg" 
                alt="Автозапчасти MultiBrend" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Найдите нужную запчасть</h3>
            <p className="text-gray-600">Используйте поиск по названию или VIN-коду автомобиля</p>
          </div>

          <Tabs defaultValue="search" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="search">Поиск по названию</TabsTrigger>
              <TabsTrigger value="vin">VIN-код</TabsTrigger>
              <TabsTrigger value="brands">По маркам</TabsTrigger>
            </TabsList>
            
            <TabsContent value="search" className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Введите название запчасти..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 text-lg"
                  />
                </div>
                <Select onValueChange={(value) => setSelectedBrand(value)}>
                  <SelectTrigger className="w-48 h-12">
                    <SelectValue placeholder="Марка авто" />
                  </SelectTrigger>
                  <SelectContent>
                    {carBrands.map(brand => (
                      <SelectItem key={brand.name} value={brand.name}>
                        {brand.logo} {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  className="h-12 px-8 bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    if (searchQuery.trim()) {
                      toast({ title: "Поиск запущен", description: `Ищем: ${searchQuery}` });
                    } else {
                      toast({ title: "Ошибка", description: "Введите название запчасти" });
                    }
                  }}
                >
                  <Icon name="Search" className="w-5 h-5 mr-2" />
                  Найти
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="vin" className="space-y-4">
              <VinScanner onVinResult={(result) => {
                toast({ title: "VIN найден", description: `${result.brand} ${result.model} ${result.year}` });
              }} />
            </TabsContent>
            
            <TabsContent value="brands" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {carBrands.map(brand => (
                  <Card 
                    key={brand.name} 
                    className={`cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 ${
                      selectedBrand === brand.name ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      setSelectedBrand(brand.name);
                      toast({ title: "Марка выбрана", description: `${brand.name} - ${brand.partsCount.toLocaleString()} запчастей` });
                    }}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{brand.logo}</div>
                      <h4 className="font-semibold text-gray-900">{brand.name}</h4>
                      <p className="text-sm text-gray-500">{brand.partsCount.toLocaleString()} запчастей</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Popular Parts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Популярные запчасти</h3>
            <p className="text-gray-600">Самые востребованные детали с актуальными ценами</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularParts.map((part, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{part.name}</CardTitle>
                    <Badge variant={part.inStock ? "default" : "secondary"}>
                      {part.inStock ? "В наличии" : "Под заказ"}
                    </Badge>
                  </div>
                  <CardDescription>{part.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{part.price}</span>
                    <Button 
                      size="sm" 
                      variant={part.inStock ? "default" : "outline"}
                      onClick={() => {
                        setCartItems(prev => prev + 1);
                        toast({ 
                          title: part.inStock ? "Добавлено в корзину" : "Заказ оформлен", 
                          description: part.name 
                        });
                      }}
                    >
                      <Icon name="ShoppingCart" className="w-4 h-4 mr-2" />
                      {part.inStock ? "Купить" : "Заказать"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Integration Status */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Интеграция с поставщиками</h3>
            <p className="text-gray-600">Актуальные цены и наличие от проверенных поставщиков</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {apiProviders.map((provider, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{provider.name}</CardTitle>
                  <div className="flex items-center justify-center mt-2">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      provider.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className="text-sm text-gray-600">
                      {provider.status === 'active' ? 'Активен' : 'Обслуживание'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">
                    {provider.partsCount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">запчастей</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Icon name="Wrench" className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-xl font-bold">MultiBrend</h4>
              </div>
              <p className="text-gray-400">
                Надежный поставщик автозапчастей с 2015 года
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Каталог</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Двигатель</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Тормозная система</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Подвеска</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Электрика</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Помощь</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Возврат</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Гарантия</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Поддержка</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Icon name="Phone" className="w-4 h-4 mr-2" />
                  +7 (800) 555-0123
                </li>
                <li className="flex items-center">
                  <Icon name="Mail" className="w-4 h-4 mr-2" />
                  info@multibrend.ru
                </li>
                <li className="flex items-center">
                  <Icon name="MapPin" className="w-4 h-4 mr-2" />
                  Москва, ул. Автозаводская, 1
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MultiBrend. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;