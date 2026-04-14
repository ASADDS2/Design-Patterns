import { Subject } from '../patterns/Observer';

export interface ProductData {
  id: number;
  name: string;
  price: number;
  stock: number;
  history_logs: any[];
}

class MarketStore extends Subject {
  private products: ProductData[] = [];

  public getProducts() {
    return this.products;
  }

  public setProducts(products: ProductData[]) {
    this.products = products;
    this.notify(this.products);
  }

  public updateProduct(updatedProduct: ProductData) {
    this.products = this.products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    this.notify(this.products); // Notifica a todos los suscriptores
  }
}

export const marketStore = new MarketStore();
