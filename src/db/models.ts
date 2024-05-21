
export class BeerOrder {
  constructor(
    public id: string | null = null,
    public beerType: string = "",
    public liters: number = 0,
    public isDone: boolean = false,
    public createDate: Date = new Date()
  ) {}
}
