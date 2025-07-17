import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

interface VinScannerProps {
  onVinResult?: (result: VinResult) => void;
}

interface VinResult {
  vin: string;
  brand: string;
  model: string;
  year: number;
  engine: string;
  transmission: string;
  compatibleParts: Array<{
    name: string;
    price: string;
    supplier: string;
    availability: boolean;
  }>;
}

const VinScanner: React.FC<VinScannerProps> = ({ onVinResult }) => {
  const [vinCode, setVinCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<VinResult | null>(null);
  const [error, setError] = useState('');

  const mockVinResult: VinResult = {
    vin: 'WBAVD13526KX12345',
    brand: 'BMW',
    model: '3 Series',
    year: 2018,
    engine: '2.0L B48 Turbo',
    transmission: 'Автомат',
    compatibleParts: [
      { name: 'Масляный фильтр', price: '890 ₽', supplier: 'AutoDoc', availability: true },
      { name: 'Тормозные колодки передние', price: '3 200 ₽', supplier: 'Exist.ru', availability: true },
      { name: 'Воздушный фильтр', price: '1 450 ₽', supplier: 'Emex', availability: false },
      { name: 'Свечи зажигания (комплект)', price: '2 100 ₽', supplier: 'AutoDoc', availability: true },
    ]
  };

  const validateVin = (vin: string): boolean => {
    return vin.length === 17 && /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
  };

  const handleScanVin = async () => {
    if (!validateVin(vinCode)) {
      setError('VIN-код должен содержать 17 символов (латинские буквы и цифры)');
      return;
    }

    setIsScanning(true);
    setError('');
    
    // Имитация API запроса
    setTimeout(() => {
      setScanResult(mockVinResult);
      setIsScanning(false);
      onVinResult?.(mockVinResult);
    }, 2000);
  };

  const handleVinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setVinCode(value);
    setError('');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Scan" className="w-5 h-5" />
            VIN-сканер
          </CardTitle>
          <CardDescription>
            Введите VIN-код для точного подбора запчастей
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="Введите VIN-код (17 символов)"
                value={vinCode}
                onChange={handleVinChange}
                className="h-12 text-lg font-mono"
                maxLength={17}
              />
            </div>
            <Button 
              onClick={handleScanVin}
              disabled={isScanning || vinCode.length !== 17}
              className="h-12 px-6 bg-orange-600 hover:bg-orange-700"
            >
              {isScanning ? (
                <>
                  <Icon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Сканирую...
                </>
              ) : (
                <>
                  <Icon name="Scan" className="w-4 h-4 mr-2" />
                  Сканировать
                </>
              )}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <Icon name="AlertCircle" className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-gray-500 space-y-1">
            <p>• VIN-код находится на лобовом стекле слева внизу</p>
            <p>• Также указан в ПТС и свидетельстве о регистрации</p>
            <p>• Состоит из 17 символов (буквы и цифры)</p>
          </div>
        </CardContent>
      </Card>

      {scanResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="CheckCircle" className="w-5 h-5 text-green-600" />
              Результат сканирования
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Информация об автомобиле</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Марка:</span>
                    <span className="font-medium">{scanResult.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Модель:</span>
                    <span className="font-medium">{scanResult.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Год:</span>
                    <span className="font-medium">{scanResult.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Двигатель:</span>
                    <span className="font-medium">{scanResult.engine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">КПП:</span>
                    <span className="font-medium">{scanResult.transmission}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">VIN-код</h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <code className="text-sm font-mono">{scanResult.vin}</code>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Совместимые запчасти</h4>
              <div className="grid gap-3">
                {scanResult.compatibleParts.map((part, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h5 className="font-medium">{part.name}</h5>
                      <p className="text-sm text-gray-600">Поставщик: {part.supplier}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{part.price}</p>
                      <Badge variant={part.availability ? "default" : "secondary"}>
                        {part.availability ? "В наличии" : "Под заказ"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VinScanner;