export interface Entity {
  id: string;
  collection: string;
}

export interface BeerOrder extends Entity {
  collection: "beerOrders";
  beerType: string;
  liters: number;
  isDone: boolean;
  createDate: Date;
}
