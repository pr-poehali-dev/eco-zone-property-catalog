import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Property {
  id: number;
  title: string;
  price: number;
  area: number;
  rooms: number;
  type: 'Квартира' | 'Таунхаус' | 'Вилла';
  image: string;
  location: { lat: number; lng: number };
  description: string;
}

const properties: Property[] = [
  {
    id: 1,
    title: 'Эко-квартира с террасой',
    price: 12500000,
    area: 85,
    rooms: 3,
    type: 'Квартира',
    image: 'https://cdn.poehali.dev/projects/ec071cf0-6793-4868-a4da-f4c0ceffb030/files/e8064614-c098-4425-9b1f-7ecebbdb5af3.jpg',
    location: { lat: 55.75, lng: 37.62 },
    description: 'Светлая квартира с панорамными окнами и собственной террасой'
  },
  {
    id: 2,
    title: 'Современный таунхаус',
    price: 18900000,
    area: 120,
    rooms: 4,
    type: 'Таунхаус',
    image: 'https://cdn.poehali.dev/projects/ec071cf0-6793-4868-a4da-f4c0ceffb030/files/a0cdefc8-e905-47f2-ada9-ff08783c29f7.jpg',
    location: { lat: 55.76, lng: 37.63 },
    description: 'Двухуровневый таунхаус с собственным садом'
  },
  {
    id: 3,
    title: 'Просторная студия',
    price: 8200000,
    area: 45,
    rooms: 1,
    type: 'Квартира',
    image: 'https://cdn.poehali.dev/projects/ec071cf0-6793-4868-a4da-f4c0ceffb030/files/e8064614-c098-4425-9b1f-7ecebbdb5af3.jpg',
    location: { lat: 55.74, lng: 37.61 },
    description: 'Уютная студия с умной планировкой'
  },
  {
    id: 4,
    title: 'Премиум вилла',
    price: 35000000,
    area: 180,
    rooms: 5,
    type: 'Вилла',
    image: 'https://cdn.poehali.dev/projects/ec071cf0-6793-4868-a4da-f4c0ceffb030/files/a0cdefc8-e905-47f2-ada9-ff08783c29f7.jpg',
    location: { lat: 55.77, lng: 37.64 },
    description: 'Роскошная вилла с бассейном и лесным участком'
  },
  {
    id: 5,
    title: 'Семейная квартира',
    price: 15700000,
    area: 95,
    rooms: 3,
    type: 'Квартира',
    image: 'https://cdn.poehali.dev/projects/ec071cf0-6793-4868-a4da-f4c0ceffb030/files/e8064614-c098-4425-9b1f-7ecebbdb5af3.jpg',
    location: { lat: 55.73, lng: 37.60 },
    description: 'Идеальна для семьи с детьми, рядом парк и школа'
  },
  {
    id: 6,
    title: 'Уютный таунхаус',
    price: 22000000,
    area: 140,
    rooms: 4,
    type: 'Таунхаус',
    image: 'https://cdn.poehali.dev/projects/ec071cf0-6793-4868-a4da-f4c0ceffb030/files/a0cdefc8-e905-47f2-ada9-ff08783c29f7.jpg',
    location: { lat: 55.75, lng: 37.65 },
    description: 'Таунхаус с камином и зоной барбекю'
  }
];

const Index = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 40000000]);
  const [areaRange, setAreaRange] = useState<number[]>([0, 200]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRooms, setSelectedRooms] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const filteredProperties = properties.filter(prop => {
    const priceMatch = prop.price >= priceRange[0] && prop.price <= priceRange[1];
    const areaMatch = prop.area >= areaRange[0] && prop.area <= areaRange[1];
    const typeMatch = selectedType === 'all' || prop.type === selectedType;
    const roomsMatch = selectedRooms === 'all' || prop.rooms === parseInt(selectedRooms);
    return priceMatch && areaMatch && typeMatch && roomsMatch;
  });

  const favoriteProperties = properties.filter(prop => favorites.includes(prop.id));

  const formatPrice = (price: number) => {
    return (price / 1000000).toFixed(1) + ' млн ₽';
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Leaf" className="text-primary" size={22} />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-primary">EcoEstate</h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setActiveTab('home')}
                className={`text-sm font-medium transition-all duration-200 ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Главная
              </button>
              <button 
                onClick={() => setActiveTab('catalog')}
                className={`text-sm font-medium transition-all duration-200 ${activeTab === 'catalog' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Каталог
              </button>
              <button 
                onClick={() => setActiveTab('map')}
                className={`text-sm font-medium transition-all duration-200 ${activeTab === 'map' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Карта
              </button>
              <button 
                onClick={() => setActiveTab('about')}
                className={`text-sm font-medium transition-all duration-200 ${activeTab === 'about' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                О проекте
              </button>
              <button 
                onClick={() => setActiveTab('contact')}
                className={`text-sm font-medium transition-all duration-200 ${activeTab === 'contact' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Контакты
              </button>
            </nav>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setActiveTab('favorites')}
              className="relative hover:bg-primary/5"
            >
              <Icon name="Heart" size={20} className={favorites.length > 0 ? 'fill-primary text-primary' : ''} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {favorites.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {activeTab === 'home' && (
          <div className="space-y-24 animate-fade-in">
            <section className="relative rounded-[2rem] overflow-hidden h-[600px] flex items-center justify-center shadow-2xl shadow-primary/10">
              <img 
                src="https://cdn.poehali.dev/projects/ec071cf0-6793-4868-a4da-f4c0ceffb030/files/251703a2-cfdd-48eb-a535-c0589ebb40f7.jpg"
                alt="Эко-поселок"
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="relative z-10 text-center text-white max-w-4xl px-6">
                <p className="text-sm uppercase tracking-[0.3em] mb-6 text-white/80 font-light">Эксклюзивная недвижимость</p>
                <h2 className="text-5xl md:text-7xl font-semibold mb-6 leading-tight">Жизнь в гармонии<br/>с природой</h2>
                <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto font-light">Современная недвижимость в экологически чистой зоне с развитой инфраструктурой</p>
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 shadow-xl h-14 px-8 text-base font-medium rounded-full transition-all hover:shadow-2xl hover:scale-105"
                  onClick={() => setActiveTab('catalog')}
                >
                  Смотреть объекты
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </section>

            <section>
              <div className="text-center mb-16">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">Лучшие предложения</p>
                <h3 className="text-4xl md:text-5xl font-semibold mb-4">Избранные объекты</h3>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Тщательно отобранные варианты для вашего комфорта</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.slice(0, 3).map((property) => (
                  <Card key={property.id} className="overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border-0 bg-card/50 backdrop-blur animate-scale-in">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-4 right-4 bg-white/95 hover:bg-white backdrop-blur-sm shadow-lg h-10 w-10 rounded-full p-0 transition-all hover:scale-110"
                        onClick={() => toggleFavorite(property.id)}
                      >
                        <Icon 
                          name="Heart" 
                          size={18}
                          className={favorites.includes(property.id) ? 'fill-primary text-primary' : 'text-muted-foreground'}
                        />
                      </Button>
                      <Badge className="absolute bottom-4 left-4 bg-white/95 text-foreground backdrop-blur-sm border-0 px-3 py-1 font-medium">
                        {property.type}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">{property.title}</h4>
                      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{property.description}</p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-5">
                        <div className="flex items-center gap-2">
                          <Icon name="Maximize2" size={16} />
                          <span>{property.area} м²</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Home" size={16} />
                          <span>{property.rooms} комн.</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-5 border-t border-border/50">
                        <span className="text-2xl font-semibold text-primary">{formatPrice(property.price)}</span>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-primary hover:text-primary hover:bg-primary/5"
                          onClick={() => {
                            setSelectedProperty(property);
                            setActiveTab('map');
                          }}
                        >
                          Подробнее
                          <Icon name="ArrowRight" size={16} className="ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="rounded-full px-8 h-12 border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all"
                  onClick={() => setActiveTab('catalog')}
                >
                  Все объекты
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
            </section>

            <section className="bg-gradient-to-br from-secondary/30 to-primary/5 rounded-[2rem] p-12 md:p-16 border border-border/30">
              <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon name="Trees" className="text-primary" size={32} />
                  </div>
                  <h4 className="text-2xl font-semibold mb-3">Эко-зона</h4>
                  <p className="text-muted-foreground text-base leading-relaxed">Чистый воздух и природа вокруг</p>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon name="Home" className="text-primary" size={32} />
                  </div>
                  <h4 className="text-2xl font-semibold mb-3">Комфорт</h4>
                  <p className="text-muted-foreground text-base leading-relaxed">Современная инфраструктура</p>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon name="Shield" className="text-primary" size={32} />
                  </div>
                  <h4 className="text-2xl font-semibold mb-3">Безопасность</h4>
                  <p className="text-muted-foreground text-base leading-relaxed">Охраняемая территория 24/7</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'catalog' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold mb-2">Каталог объектов</h2>
              <p className="text-muted-foreground">Найдите идеальный вариант для вашей семьи</p>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-6">Фильтры</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Цена: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </label>
                    <Slider
                      min={0}
                      max={40000000}
                      step={1000000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Площадь: {areaRange[0]} - {areaRange[1]} м²
                    </label>
                    <Slider
                      min={0}
                      max={200}
                      step={5}
                      value={areaRange}
                      onValueChange={setAreaRange}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-3 block">Тип недвижимости</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все типы</SelectItem>
                        <SelectItem value="Квартира">Квартира</SelectItem>
                        <SelectItem value="Таунхаус">Таунхаус</SelectItem>
                        <SelectItem value="Вилла">Вилла</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-3 block">Количество комнат</label>
                    <Select value={selectedRooms} onValueChange={setSelectedRooms}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Любое</SelectItem>
                        <SelectItem value="1">1 комната</SelectItem>
                        <SelectItem value="3">3 комнаты</SelectItem>
                        <SelectItem value="4">4 комнаты</SelectItem>
                        <SelectItem value="5">5+ комнат</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Найдено объектов: <span className="font-semibold text-foreground">{filteredProperties.length}</span>
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setPriceRange([0, 40000000]);
                    setAreaRange([0, 200]);
                    setSelectedType('all');
                    setSelectedRooms('all');
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                      onClick={() => toggleFavorite(property.id)}
                    >
                      <Icon 
                        name="Heart" 
                        size={18}
                        className={favorites.includes(property.id) ? 'fill-primary text-primary' : ''}
                      />
                    </Button>
                    <Badge className="absolute bottom-3 left-3 bg-accent text-accent-foreground">
                      {property.type}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h4 className="font-semibold text-lg mb-2">{property.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{property.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Icon name="Maximize2" size={16} />
                        <span>{property.area} м²</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Home" size={16} />
                        <span>{property.rooms} комн.</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{formatPrice(property.price)}</span>
                      <Button size="sm" onClick={() => {
                        setSelectedProperty(property);
                        setActiveTab('map');
                      }}>
                        На карте
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-16">
                <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground mb-6">Попробуйте изменить параметры фильтров</p>
                <Button onClick={() => {
                  setPriceRange([0, 40000000]);
                  setAreaRange([0, 200]);
                  setSelectedType('all');
                  setSelectedRooms('all');
                }}>
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'map' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold mb-2">Интерактивная карта</h2>
              <p className="text-muted-foreground">Расположение объектов на территории</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 p-6">
                <div className="relative bg-muted rounded-lg h-[600px] overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full bg-gradient-to-br from-secondary via-background to-muted">
                      {properties.map((property) => (
                        <button
                          key={property.id}
                          onClick={() => setSelectedProperty(property)}
                          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 ${
                            selectedProperty?.id === property.id ? 'scale-125 z-10' : ''
                          }`}
                          style={{
                            left: `${((property.location.lng - 37.60) / 0.05) * 100}%`,
                            top: `${((55.77 - property.location.lat) / 0.04) * 100}%`
                          }}
                        >
                          <div className={`relative ${selectedProperty?.id === property.id ? 'animate-scale-in' : ''}`}>
                            <Icon 
                              name="MapPin" 
                              size={36}
                              className={`${
                                selectedProperty?.id === property.id 
                                  ? 'text-accent fill-accent' 
                                  : 'text-primary fill-primary'
                              }`}
                            />
                            {selectedProperty?.id === property.id && (
                              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-[200px] z-20">
                                <div className="text-xs font-semibold mb-1">{property.title}</div>
                                <div className="text-xs text-muted-foreground mb-2">{formatPrice(property.price)}</div>
                                <div className="flex gap-2 text-xs">
                                  <span>{property.area} м²</span>
                                  <span>·</span>
                                  <span>{property.rooms} комн.</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                      
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg p-3 shadow-lg">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="MapPin" size={20} className="text-primary fill-primary" />
                          <span className="font-medium">EcoEstate</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Московская область</p>
                      </div>

                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-lg p-2 shadow-lg space-y-2">
                        <Button size="sm" variant="ghost" className="w-full justify-start">
                          <Icon name="Plus" size={18} />
                        </Button>
                        <Button size="sm" variant="ghost" className="w-full justify-start">
                          <Icon name="Minus" size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                {selectedProperty ? (
                  <Card className="overflow-hidden animate-scale-in">
                    <img 
                      src={selectedProperty.image} 
                      alt={selectedProperty.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg mb-1">{selectedProperty.title}</h4>
                          <Badge className="bg-accent text-accent-foreground">{selectedProperty.type}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(selectedProperty.id)}
                        >
                          <Icon 
                            name="Heart" 
                            size={20}
                            className={favorites.includes(selectedProperty.id) ? 'fill-primary text-primary' : ''}
                          />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{selectedProperty.description}</p>
                      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Icon name="Maximize2" size={16} className="text-muted-foreground" />
                          <span>{selectedProperty.area} м²</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Home" size={16} className="text-muted-foreground" />
                          <span>{selectedProperty.rooms} комн.</span>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <div className="text-2xl font-bold text-primary mb-4">
                          {formatPrice(selectedProperty.price)}
                        </div>
                        <Button className="w-full">
                          <Icon name="Phone" size={18} className="mr-2" />
                          Связаться
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="p-6 text-center">
                    <Icon name="MapPin" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h4 className="font-semibold mb-2">Выберите объект</h4>
                    <p className="text-sm text-muted-foreground">
                      Нажмите на маркер на карте, чтобы увидеть подробную информацию
                    </p>
                  </Card>
                )}

                <Card className="p-4">
                  <h4 className="font-semibold mb-3 text-sm">Легенда</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="MapPin" size={18} className="text-primary fill-primary" />
                      <span className="text-muted-foreground">Доступные объекты</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="MapPin" size={18} className="text-accent fill-accent" />
                      <span className="text-muted-foreground">Выбранный объект</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-4xl font-bold mb-2">Избранное</h2>
              <p className="text-muted-foreground">Сохраненные вами объекты</p>
            </div>

            {favoriteProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProperties.map((property) => (
                  <Card key={property.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                        onClick={() => toggleFavorite(property.id)}
                      >
                        <Icon 
                          name="Heart" 
                          size={18}
                          className="fill-primary text-primary"
                        />
                      </Button>
                      <Badge className="absolute bottom-3 left-3 bg-accent text-accent-foreground">
                        {property.type}
                      </Badge>
                    </div>
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-lg mb-2">{property.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{property.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Icon name="Maximize2" size={16} />
                          <span>{property.area} м²</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Home" size={16} />
                          <span>{property.rooms} комн.</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">{formatPrice(property.price)}</span>
                        <Button size="sm" onClick={() => {
                          setSelectedProperty(property);
                          setActiveTab('map');
                        }}>
                          На карте
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-16 text-center">
                <Icon name="Heart" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Список избранного пуст</h3>
                <p className="text-muted-foreground mb-6">Добавьте объекты в избранное, чтобы не потерять их</p>
                <Button onClick={() => setActiveTab('catalog')}>
                  Перейти в каталог
                </Button>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">О проекте EcoEstate</h2>
              <p className="text-xl text-muted-foreground">
                Создаем пространство для жизни в гармонии с природой
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden h-80">
              <img 
                src="https://cdn.poehali.dev/projects/ec071cf0-6793-4868-a4da-f4c0ceffb030/files/251703a2-cfdd-48eb-a535-c0589ebb40f7.jpg"
                alt="О проекте"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <Icon name="Leaf" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-3">Экологичность</h3>
                <p className="text-muted-foreground">
                  Все здания построены из экологически чистых материалов. Собственные очистные сооружения и система сбора дождевой воды.
                </p>
              </Card>
              <Card className="p-6">
                <Icon name="Sparkles" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-3">Современность</h3>
                <p className="text-muted-foreground">
                  Умный дом, высокоскоростной интернет, электрозаправки и продуманная инфраструктура для комфортной жизни.
                </p>
              </Card>
              <Card className="p-6">
                <Icon name="Users" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-3">Сообщество</h3>
                <p className="text-muted-foreground">
                  Живое комьюнити единомышленников. Регулярные мероприятия, совместные проекты и дружеская атмосфера.
                </p>
              </Card>
              <Card className="p-6">
                <Icon name="Map" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-3">Расположение</h3>
                <p className="text-muted-foreground">
                  35 км от МКАД по Новорижскому шоссе. Лес, река, чистый воздух - и при этом близко к городу.
                </p>
              </Card>
            </div>

            <Card className="p-8 bg-secondary/50">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">120+</div>
                  <p className="text-muted-foreground">Готовых объектов</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">15 га</div>
                  <p className="text-muted-foreground">Территория поселка</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <p className="text-muted-foreground">Зеленая энергия</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Контакты</h2>
              <p className="text-xl text-muted-foreground">
                Свяжитесь с нами удобным способом
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Отдел продаж</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-medium">+7 (495) 123-45-67</div>
                      <div className="text-sm text-muted-foreground">Ежедневно с 9:00 до 21:00</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-medium">info@ecoestate.ru</div>
                      <div className="text-sm text-muted-foreground">Ответим в течение часа</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" className="text-primary mt-1" size={20} />
                    <div>
                      <div className="font-medium">Офис продаж</div>
                      <div className="text-sm text-muted-foreground">Москва, ул. Примерная, д. 10</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Записаться на просмотр</h3>
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
                }}>
                  <div>
                    <label className="text-sm font-medium block mb-2">Ваше имя</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Телефон</label>
                    <input 
                      type="tel"
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      placeholder="+7 (___) ___-__-__"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Комментарий</label>
                    <textarea 
                      className="w-full px-4 py-2 rounded-lg border border-input bg-background resize-none"
                      rows={3}
                      placeholder="Интересующий объект или вопрос"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Отправить заявку
                  </Button>
                </form>
              </Card>
            </div>

            <Card className="p-8 bg-secondary/50">
              <h3 className="text-xl font-semibold mb-4 text-center">Как добраться</h3>
              <p className="text-center text-muted-foreground mb-6">
                35 км от МКАД по Новорижскому шоссе, поворот на указателе "EcoEstate"
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Icon name="Car" className="text-primary mt-1" size={24} />
                  <div>
                    <div className="font-medium mb-1">На автомобиле</div>
                    <div className="text-sm text-muted-foreground">30-40 минут от центра Москвы</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Bus" className="text-primary mt-1" size={24} />
                  <div>
                    <div className="font-medium mb-1">На общественном транспорте</div>
                    <div className="text-sm text-muted-foreground">Автобус №850 от м. Тушинская</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-primary/5 mt-20 py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Trees" className="text-primary" size={24} />
                <span className="font-bold text-lg">EcoEstate</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Недвижимость в гармонии с природой
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Навигация</h4>
              <div className="space-y-2 text-sm">
                <button onClick={() => setActiveTab('home')} className="block text-muted-foreground hover:text-primary transition-colors">Главная</button>
                <button onClick={() => setActiveTab('catalog')} className="block text-muted-foreground hover:text-primary transition-colors">Каталог</button>
                <button onClick={() => setActiveTab('about')} className="block text-muted-foreground hover:text-primary transition-colors">О проекте</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>+7 (495) 123-45-67</div>
                <div>info@ecoestate.ru</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Социальные сети</h4>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Icon name="Instagram" size={18} />
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Facebook" size={18} />
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Twitter" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2024 EcoEstate. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;