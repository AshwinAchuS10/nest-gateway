export interface IServiceCategoryResponse {
  status: number;
  message: string;
  category: ICategory;
  errors: { [key: string]: any };
  errorMetadata: { [key: string]: any };
}

export interface ICategory {
  name: string;
}
