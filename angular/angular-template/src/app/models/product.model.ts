export interface Product {
  Description: string;
  IsAffiliate: boolean;
  IsPopularGift:boolean;
  IsTopGift:boolean;
  PersonalMessageMaxLength: number | null;
  Price:number;
  PriceLabel: string;
  ProductId: number;
  ProductImage: string;
  ProductLink: string;
  ProductTags: Array<any>;
  ProductTitle: string;
  ShippingMandatory: boolean;
  ThumbnailProductImage: string | null;
}